const yargs = require("yargs");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");

const argv = yargs
  .command({
    command: "list",
    describe: "List all contacts",
    handler: () => invokeAction({ action: "list" }),
  })
  .command({
    command: "get <id>",
    describe: "Get a contact by ID",
    handler: (argv) => invokeAction({ action: "get", id: argv.id }),
  })
  .command({
    command: "add <name> <email> <phone>",
    describe: "Add a new contact",
    handler: (argv) =>
      invokeAction({
        action: "add",
        name: argv.name,
        email: argv.email,
        phone: argv.phone,
      }),
  })
  .command({
    command: "remove <id>",
    describe: "Remove a contact by ID",
    handler: (argv) => invokeAction({ action: "remove", id: argv.id }),
  })
  .demandCommand()
  .help().argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("Contacts List:", contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log("Contact by ID:", contact);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.log("Added Contact:", addedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log("Removed Contact:", removedContact);
      break;

    default:
      console.log(
        "Unknown command. Please use one of: list, get, add, remove."
      );
  }
}
