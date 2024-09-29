import express from "express";

export const testRou = express.Router();

testRou.get("/", (req, res) => {
    res.json({ message: "API is working correctly" });
});

testRou.get("/m-salim", (req,res) => {
    res.json({ name: "Maxamed saalim", age: "25", educations: "Jamhuraya University", message: "Your Legend Keep Working and Never Mine" });
})

testRou.get("/mahdi", (req,res) => {
    res.json({ name: "Mahdi Abdulqaadir", age: "20", educations: "Jamhuraya University", message: "Your Legend Keep Working and Never Mine", Town: "Bakaaro in COD" });

})

testRou.get("/miki", (req,res) => {
    res.json({ name: "Ashwaag Ibraahim", age: "97", educations: "Jamhuraya University", message: "The first 97 year-old person in the world to graduate from university.", JK:"Your 18 😒" });
})

testRou.get("/jacar", (req,res) => {
    res.json({ name1: "Mahdi", name2: "Moha", name3:"Sadaq", name4:"Chees Master", name5:"Xasuuni", name6:"undefined other jacar" });
})