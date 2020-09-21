import express from "express";
import db from "../database";

const route = express.Router();

route.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.redirect('/')
  }

  const shortHand = req.params.id

  try {
    db.get('SELECT url FROM redirects WHERE shortcode = ?', [shortHand], (err, row) => {
      if (err) {
        return console.error(err.message);
      }

      if (row) {
        console.log(row)
        res.redirect(row.url)
        return
      }

      res.redirect('/')
    });
  } catch (err) {
    res.redirect('/')
  }
})

export default route;