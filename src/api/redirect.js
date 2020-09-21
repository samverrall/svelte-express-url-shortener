import express from "express";
import {
  generate
} from "randomstring";
import {
  v4 as uuidv4
} from "uuid";
import {
  createRedirectTableIfNotExists
} from "../schema/redirectSchema";
import db from "../database";

const route = express.Router();

route.get("/redirect", (req, res) => {
  try {
    db.all(`SELECT * FROM redirects`, [], (err, rows) => {
      if (err) {
        throw err;
      }

      res.status(200).json(rows)
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
});

route.post("/redirect", async (req, res) => {
  await createRedirectTableIfNotExists();

  const {
    body
  } = req;

  console.log(body);

  try {
    const shortHand = generate(7);
    const url = body.url;

    const data = {
      id: uuidv4(),
      url,
      shortHand,
    };

    const whereArgs = [data.id, data.url, data.shortHand];
    db.run(
      `INSERT INTO redirects(id, url, shortcode) VALUES (?,?,?)`,
      whereArgs,
      function (err) {
        if (err) {
          return res.send(500).json({
            error: "There was an issue creating your shortend url.",
          });
        }
      }
    );

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
});

export default route;