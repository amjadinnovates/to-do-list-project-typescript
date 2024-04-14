#! /usr/bin/env node
import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";
import clear from "clear";
function centerText(text: string): void {
  const terminalWidth = process.stdout.columns;
  const paddingLength = Math.max(
    0,
    Math.floor((terminalWidth - text.length) / 2)
  );
  const padding = " ".repeat(paddingLength);
  console.log(padding + text);
}

let todos: { [key: string]: any } = {
  list1: ["potato 1kg", "tomato 1kg", "yougurt 1/2 kg", "apple"],
};
let mainLoop = true;
while (mainLoop) {
  console.log("\n\n");

  centerText("____________This is your to-do list manager___________");
  const ans = await inquirer.prompt([
    {
      name: "decision",
      type: "list",
      message: "select one option:",
      choices: [
        "Make new to-do list",
        "Add work to existing list",
        "View all to-do lists",
      ],
    },
  ]);
  clear();
  switch (ans.decision) {
    case "Make new to-do list":
      const nameOfList = await inquirer.prompt({
        name: "nameOfList",
        type: "input",
        message: "Give your list a name :",
      });
      let ListName: string = nameOfList.nameOfList;

      let newlist: string[] = [];
      //let x = "add";
      while (true) {
        const l = await inquirer.prompt({
          name: "listItem",
          type: "input",
          message: "\n Add item  :",
        });
        clear();
        newlist.push(l.listItem);
        const add_or_stop = await inquirer.prompt({
          name: "list_add_decision",
          type: "list",
          message: "\nAdd more items?  :",
          choices: ["add", "stop"],
        });
        clear();
        if (add_or_stop.list_add_decision === "add") {
          continue;
        } else {
          break;
        }
      }
      console.log("\n Your new to do list is: \n", newlist);
      todos[ListName] = newlist;
      break;
    case "Add work to existing list":
      let add_existing_list = await inquirer.prompt([
        {
          name: "existingList",
          type: "input",
          message: "What is the name of list you want to access? :",
        },
      ]);
      let x = add_existing_list.existingList;
      if (x in todos) {
        while (true) {
          const l = await inquirer.prompt({
            name: "listItem",
            type: "input",
            message: "\n Add item  :",
          });
          clear();
          //newlist.push(l.listItem);
          todos[x].push(l.listItem);
          const add_or_stop = await inquirer.prompt({
            name: "list_add_decision",
            type: "list",
            message: "\nAdd more items?  :",
            choices: ["add", "stop"],
          });
          clear();
          if (add_or_stop.list_add_decision === "add") {
            continue;
          } else {
            const updated_list = todos[x];
            console.log("your update list is:\n", updated_list);
            break;
          }
        }

        //console.log(todos);
      }
      break;
    case "View all to-do lists":
      console.log(todos);
      
      break;
      default:
      break;
  }
  const loopDec = await inquirer.prompt({
    name: "loopDec",
    type: "confirm",
    message:
      "\n\n____________would you like more assistance from your to_dos manager?____________\n\n",
  });
  switch (loopDec.loopDec) {
    case true:
      continue;
      break;
    case false:
      centerText("__________Take care bye__________");
      //console.log("\n _________.__________");

      break;
      break;
    default:
      break;
  }
  mainLoop = loopDec.loopDec;
}
