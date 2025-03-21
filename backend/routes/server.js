const express = require("express");
const db = require("../config/db");
const router = express.Router();
const bcrypt = require('bcrypt');


// READ
router.get("/", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});



//CREATE
router.post("/payments", (req, res) => {
  const mobile = req.body.mobile;
  // const author = req.body.author;

  const newTodo = { mobile };

  console.log(newTodo.title)
  const sql = "INSERT INTO payments (mobile) VALUES (?)";
  db.query(sql, [mobile], (err, result) => {
    if (err) {
      throw err;
    }
    newTodo.id = result.insertId;
    res.json(newTodo);
  });
});

//CREATE
// Registration route (assuming you already have a User model)
// router.post('/user', async (req, res) => {
//   const { username, email, password, dob } = req.body;

//   // Basic validation
//   

router.post('/user', async (req, res) => {
  try {
    const { name, email, password, dob, incomeRange } = req.body;

    // Validate required fields
    if (!name || !email || !password || !dob || !incomeRange) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { name, email, password: hashedPassword, dob, incomeRange };

    const sql = "INSERT INTO user (name, email, password, dob, incomeRange) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, dob, incomeRange], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }

      newUser.id = result.insertId;
      
      res.status(201).json(newUser);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if both fields are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Both email and password are required" });
  }

  // Query the database to find a user with the given email
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    // If no user is found
    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // If the email and password match, return a success message or token (if using JWT for example)
    res.json({ success: true, message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
  });
});

//CREATE
router.post("/expenses", (req, res) => {
  const bill = req.body.bill;
  const pNumber = req.body.pNumber;
  const mPayment = req.body.mPayment;
  const amount = req.body.amount;
  const dob = req.body.date;
  const reference = req.body.reference;

  const newTodo = { bill, pNumber, mPayment, amount, dob, reference };

  console.log(newTodo.title)
  const sql = "INSERT INTO expenses (bill, pNumber, mPayment, amount, date, reference) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [bill, pNumber, mPayment, amount, dob, reference], (err, result) => {
    if (err) {
      throw err;
    }
    newTodo.id = result.insertId;
    res.json(newTodo);
  });
});

router.post("/income", (req, res) => {
  const pNumber = req.body.pNumber;
  const mPayment = req.body.mPayment;
  const amount = req.body.amount;
  const dob = req.body.date;
  const reference = req.body.reference;

  const newTodo = { pNumber, mPayment, amount, dob, reference };

  console.log(newTodo.title)
  const sql = "INSERT INTO income (pNumber, mPayment, amount, date, reference) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [pNumber, mPayment, amount, dob, reference], (err, result) => {
    if (err) {
      throw err;
    }
    newTodo.id = result.insertId;
    res.json(newTodo);
  });
});


// GET route to fetch data from the payment table
router.get('/getpayment', (req, res) => {
  const sql = "SELECT * FROM expenses";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
    res.json(results);
  });
});

router.get('/getincome', (req, res) => {
  const sql = "SELECT * FROM income";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
    res.json(results);
  });
});

// GET route to fetch page content
router.get("/api/page-content/:pageName", (req, res) => {
  const pageName = req.params.pageName;
  const sql = "SELECT * FROM page_content WHERE page_name = ?";
  
  db.query(sql, [pageName], (err, results) => {
    if (err) {
      console.error('Error fetching content:', err);
      return res.status(500).json({ error: 'An error occurred while fetching content' });
    }
    
    // If no results found, return default content
    if (results.length === 0) {
      return res.json({
        title: 'Kuimarisha wajasiriamali kwa ufuatiliaji rahisi wa rekodi za mapato na matumizi.',
        description: 'Tunawasaidia wajasiriamali walio rasmi kuwa na taarifa kuhusu mapato na matumizi yao ili wawe na muhtasari mzuriwa fedha zao'
      });
    }
    
    res.json(results[0]);
  });
});

// POST route to add/update page content
router.post("/page-content", (req, res) => {
  const { title, description, pageName } = req.body;

  const sql = "INSERT INTO page_content (title, description, page_name) VALUES (?, ?, ?)";
  db.query(sql, [title, description, pageName], (err, result) => {
    if (err) {
      console.error('Error saving content:', err);
      return res.status(500).json({ error: 'An error occurred while saving content' });
    }
    res.json({ id: result.insertId, title, description, page_name: pageName });
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const title = req.body.title;
  const author = req.body.author;
  const completed = req.body.completed;

  const sql =
    "UPDATE books SET title = ?, author = ?, completed = ? WHERE id = ?";

  db.query(sql, [title, author, completed, id], (err, result) => {
    if (err) {
      throw err;
    }

    const updatedTodo = { id: parseInt(id), title, author, completed };

    res.json(updatedTodo);
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM books WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({ message: "row has deleted" });
  });
});



//SETTINGS


// GET route to fetch user account information (phone, business type, dob)
// router.get("/userInfo", (req, res) => {
//   const sql = "SELECT name, email FROM user WHERE id = 10"; // Adjust if dynamic ID is needed
//   db.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Database error", details: err });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const user = results[0];
//     res.json({
//       name: user.name,  
//       email: user.email,
//     });
//   });
// });

router.get("/userInfo", (req, res) => {
  const sql = "SELECT name, email, dob, incomeRange FROM user WHERE id = 10"; // Adjust for dynamic user ID
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = results[0];
    res.json({
      name: user.name,
      email: user.email,
      dob: user.dob,
      incomeRange: user.incomeRange
    });
  });
});



// router.get("/userInfo", (req, res) => {
//   const userId = req.user?.id || req.query.id; // Get ID from auth middleware or query param

//   if (!userId) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   const sql = "SELECT name, email, dob, incomeRange FROM user WHERE id = ?";
//   db.query(sql, [userId], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Database error", details: err });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(results[0]);
//   });
// });



// GET route to fetch user statistics (income, expenses)
router.get("/userStatistics", (req, res) => {
  const userId = req.params.userId;

  // Query for income
  const incomeSql = "SELECT SUM(amount) AS totalIncome FROM income";
  db.query(incomeSql, [userId], (err, incomeResults) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    // Query for expenses
    const expensesSql = "SELECT SUM(amount) AS totalExpenses FROM expenses";
    db.query(expensesSql, [userId], (err, expensesResults) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }

      const totalIncome = incomeResults[0].totalIncome || 0;
      const totalExpenses = expensesResults[0].totalExpenses || 0;
      const netBalance = totalIncome - totalExpenses;

      res.json({
        totalIncome,
        totalExpenses,
        netBalance,
      });
    });
  });
});


// PUT route to update user password
router.put("/update-password/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;

  // Fetch user by ID to verify current password
  const sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, [userId], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];

    // Compare provided current password with stored password
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updateSql = "UPDATE user SET password = ? WHERE id = ?";
    db.query(updateSql, [hashedNewPassword, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }

      res.json({ success: true, message: "Password updated successfully" });
    });
  });
});


// DELETE route to delete a user account
router.delete("/delete-account/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = "DELETE FROM user WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, message: "Account deleted successfully" });
  });
});


module.exports = router;