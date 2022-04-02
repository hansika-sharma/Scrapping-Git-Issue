let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
// const pdf = require("pdfkit")
// const fs = require("fs");

request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
     } 
    else if (response.statusCode == 404) {
        console.log("page not found");
    }
    else {
          // console.log(html);
        getTopicLinks(html);
    }
}
function getTopicLinks(html) {
    let $ = cheerio.load(html);
    let linkElemArr = $("a.no-underline.d-flex.flex-column.flex-justify-center");
    //console.log(linkElemArr.length);
    for (let i = 0; i < linkElemArr.length; i++) {
        let href = $(linkElemArr[i]).attr("href");
        //console.log(href);
        // let topic = href.split("/").pop();  //last value remove
        
        let fullLink = `https://github.com${href}`;    //let fullLink = "https://github.com" + href;
        //console.log(fullLink);
        getReposPageHtml(fullLink);
    }
 }

function getReposPageHtml(url) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
         } 
        else if (response.statusCode == 404) {
             console.log("page not found");
         }
        else {
            getReposLink(html);
            //console.log(html);
        }
    }
}
function getReposLink(html) {
    // cheerio
    let $ = cheerio.load(html);
    let headingsArr = $("a.text-bold.wb-break-word");
    for (let i = 0; i < 8; i++) {
    let twoAnchors = $(headingsArr[i]).attr("href")
    // console.log(twoAnchors);
    let fullLink = "https://github.com"+twoAnchors+"/issues";
    // console.log(fullLink);
    getIssuesPage(fullLink);
    }
}

function getIssuesPage(url) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("page not found");
        }
        else {
            // getReposLink(html);
            // console.log(html);
            getIssues(html);
        }
    }
}

function getIssues(html) {
    let $ = cheerio.load(html);
    let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    console.log(issuesElemArr.length);
    console.log("<---------------------------Isssues------------------------------>")
    for (let i = 0; i < 5; i++) {
        let data = $(issuesElemArr[i]).text();
        console.log(data);
    }
}
