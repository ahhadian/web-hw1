package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"
)

const goWriteURLPath string = "/go/write/"
const goSha256Path string = "/go/sha256/"

func main() {
	http.HandleFunc(goWriteURLPath, writeHandler)
	http.HandleFunc(goSha256Path, go_sha256)
	fmt.Printf("Go write server is running. port: 9990\n")
	if err := http.ListenAndServe(":9990", nil); err != nil {
		log.Fatal(err)
	}
}

func writeHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != goWriteURLPath {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	switch r.Method {
	case "GET":
		keys, ok := r.URL.Query()["input"]
		if !ok || len(keys[0]) < 1 {
			log.Println("Url Param 'key' is missing")
			return
		}
		fmt.Print(keys[0], "\n")
		fmt.Print(readLine(keys[0]))
		_, _ = fmt.Fprintf(w, "%sth line content: %s", keys[0], readLine(keys[0]))
		break
	default:
		_, _ = fmt.Fprintf(w, "Request must be GET")
	}

}

func readLine(whichLineString string) string {
	if !isInteger(whichLineString) {
		return "Invalid input!"
	}
	whichLine, err := strconv.Atoi(whichLineString)
	if !isInRange(whichLine, 1, 100) {
		return "Input must be from 1 to 100"
	}
	var result string
	file, err := os.Open("../DB/text.txt")
	if err != nil {
		log.Fatalf("failed to open")
	}
	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)
	var counter = 0
	for scanner.Scan() {
		counter++
		temp := scanner.Text()
		if counter == whichLine {
			result = temp
		}
	}
	_ = file.Close()
	return result
}

func isInteger(str string) bool {
	if _, err := strconv.Atoi(str); err == nil {
		return true
	}
	return false
}

func isInRange(number, min, max int) bool {
	if min <= number && number <= max {
		return true
	}
	return false
}

func calculate_sha256(n1 uint64, n2 uint64) string {
	var s uint64 = n1 + n2
	h := sha256.New()
	h.Write([]byte(strconv.FormatUint(s, 10)))
	return hex.EncodeToString(h.Sum(nil))
}

func go_sha256(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		{
			r.ParseForm()
			number1 := r.PostForm.Get("number1")
			number2 := r.PostForm.Get("number2")
			if number1 == "" || number2 == "" {
				w.WriteHeader(http.StatusBadRequest)
				fmt.Fprintf(w, "%s\n", "You should provide both of the numbers")
				fmt.Fprintf(w, "you typed number1: %s, number2: %s", number1, number2)
			} else {
				re, err := regexp.Compile("^[0-9]+$")
				if err != nil {
					w.WriteHeader(http.StatusBadRequest)
					fmt.Println("error occured in regex")
				} else {
					if re.MatchString(number1) && re.MatchString(number2) {
						n1, err := strconv.ParseUint(number1, 10, 64)
						if err != nil {
							w.WriteHeader(http.StatusBadRequest)
							fmt.Fprintf(w, "Integer overflow in number1:)")
						} else {
							n2, err := strconv.ParseUint(number2, 10, 64)
							if err != nil {
								w.WriteHeader(http.StatusBadRequest)
								fmt.Fprintf(w, "Integer overflow in number2:)")
							} else {
								w.WriteHeader(http.StatusOK)
								fmt.Fprintf(w, "{\"sha256\":\"%s\"}", calculate_sha256(n1, n2))
							}
						}
					} else {
						w.WriteHeader(http.StatusBadRequest)
						fmt.Fprintf(w, "You should provide only numeric values")
					}
				}
			}
		}
	default:
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "I only accept POST method")
	}
}
