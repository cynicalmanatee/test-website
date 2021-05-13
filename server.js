const express = require("express");
const path = require('path');
const app = express();
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const bodyParser = require('body-parser');

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(post);
  return post;
}

async function createUser(mail) {
    const post = await prisma.player.create({
      data: {
        email: mail,
        nickname: "Not currently set",
        country: "Not currently set",
      },
    });
    console.log(post);
    return post;
}

async function updateUser(mail, nick, coun) {
  const post = await prisma.player.update({
    where: {
      email: mail
    },
    data: {
      nickname: nick,
      country: coun
    }
  })
  console.log(post);
  return post;
}

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// createUser("oscar")
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

app.use(express.static(path.join(__dirname, "build")));

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("Connected to React");
  let sendthis = await main();
  console.log(sendthis);
  res.send([sendthis]);
});

app.post("/create-user", async (req, res) => {
  console.log("Creating user");
  let sendthis = await createUser(req.body.data);
  console.log(sendthis);
  res.send("User Created!");
});

app.post("/update-user", async (req, res) => {
  console.log("Updating user");
  let sendthis = await updateUser(req.body)
})

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));