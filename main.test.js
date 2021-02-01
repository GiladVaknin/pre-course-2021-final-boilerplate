/**
 * @jest-environment node
 */
const puppeteer = require("puppeteer");

const path = "file://" + __dirname + "/src/index.html";
let page;
let browser;

const mockToDos = [
  {
    text: "first task input",
    priority: "1",
    date: new Date(),
    isDone: false,
  },
  {
    text: "second task input",
    priority: "4",
    date: new Date(),
    isDone: false,
  },
];

jest.setTimeout(10000);

describe("Gilad To-Do test", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      //   headless: false, // Uncomment me to see tests running in browser
      args: ["--disable-web-security"],
      //   slowMo: 50, // Uncomment and change me to slow down tests speed in browser.
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Counter decrease", async () => {
    await page.goto(path, { waitUntil: "networkidle0" });

    await page.waitForSelector("#counter");

    const mockToDo = mockToDos[0];
    const firstTaskText = mockToDo.text;
    const firstTaskPriority = mockToDo.priority;

    await page.type("#text-input", firstTaskText);
    await page.select("#priority-selector", firstTaskPriority);
    await page.click("#add-button");

    await page.waitForSelector(".todo-text");

    let counterElement = await page.$("#counter");
    let currentCounter = await (
      await counterElement.getProperty("innerText")
    ).jsonValue();
    expect(currentCounter).toBe("1");

    await page.click(".delete-button");

    counterElement = await page.$("#counter");
    currentCounter = await (
      await counterElement.getProperty("innerText")
    ).jsonValue();
    expect(currentCounter).toBe("0");
  });

  test("Counter zeroed after RemoveAll", async () => {
    await page.goto(path, { waitUntil: "networkidle0" });

    await page.waitForSelector("#counter");

    const mockToDo = mockToDos[0];
    const firstTaskText = mockToDo.text;
    const firstTaskPriority = mockToDo.priority;

    await page.type("#text-input", firstTaskText);
    await page.select("#priority-selector", firstTaskPriority);
    await page.click("#add-button");

    await page.waitForSelector(".todo-text");

    const mockToDoSecond = mockToDos[1];
    const secondTaskText = mockToDoSecond.text;
    const secondTaskPriority = mockToDoSecond.priority;

    await page.type("#text-input", secondTaskText);
    await page.select("#priority-selector", secondTaskPriority);
    await page.click("#add-button");

    await page.waitForSelector(".todo-text");

    let counterElement = await page.$("#counter");
    let currentCounter = await (
      await counterElement.getProperty("innerText")
    ).jsonValue();
    expect(currentCounter).toBe("2");

    await page.click("#removeAll-button");

    counterElement = await page.$("#counter");
    currentCounter = await (
      await counterElement.getProperty("innerText")
    ).jsonValue();
    expect(currentCounter).toBe("0");
  });
});
