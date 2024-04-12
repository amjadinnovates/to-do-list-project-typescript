#! /usr/bin/env node
import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";
import clear from "clear";

let todos: { [key: string]: any } = {
  list1: ["potato 1kg", "tomato 1kg", "yougurt 1/2 kg", "apple"],
};
const ans = await inquirer.prompt([
  {
    name: "decision",
    type: "list",
    message:
      "\n____________This is your to-do list manager___________\n\nselect one option:",
    choices: [
      "Make new to-do list",
      "Add work to existing list",
      // "Remove the task from to-do list",
    ],
  },
]);
clear();
switch (ans.decision) {
  case "Make new to-do list":
    const nameOfList = await inquirer.prompt({
      name: "nameOfList",
      type: "input",
      message: "\n Give your list a name :",
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
    if (add_existing_list.existingList in todos) {
      while (true) {
        const l = await inquirer.prompt({
          name: "listItem",
          type: "input",
          message: "\n Add item  :",
        });
        clear();
        //newlist.push(l.listItem);
        todos[add_existing_list.existingList].push(l.listItem);
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

      console.log(todos);
    }
    break;
  default:
    break;
}
