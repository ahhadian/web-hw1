package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

const goWriteURLPath string = "/write"

func main() {
	http.HandleFunc(goWriteURLPath, handler)
	fmt.Printf("Go write server is running. port: 9990\n")
	if err := http.ListenAndServe(":9990", nil); err != nil {
		log.Fatal(err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
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
	file, err := os.Open("DB/text.txt")
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
