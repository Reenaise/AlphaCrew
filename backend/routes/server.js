const express = require("express");
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken"); // JWT for token generation

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  jwt.verify(token, "iddy", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = decoded; // Attach user data to the request
    next();
  });
};

// Register endpoint
router.post("/user", async (req, res) => {
  try {
    const { name, email, password, dob, incomeRange } = req.body;

    // Validate required fields
    if (!name || !email || !password || !dob || !incomeRange) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password strength
    if (password.length < 5) {
      return res
        .status(400)
        .json({ error: "Password must be at least 5 characters long" });
    }

    // Check if the email already exists
    const checkUserSql = "SELECT * FROM user WHERE email = ?";
    db.query(checkUserSql, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      const insertUserSql =
        "INSERT INTO user (name, email, password, dob, incomeRange) VALUES (?, ?, ?, ?, ?)";
      db.query(
        insertUserSql,
        [name, email, hashedPassword, dob, incomeRange],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Database error", details: err });
          }

          const newUser = {
            id: result.insertId,
            name,
            email,
            dob,
            incomeRange,
          };

          // Generate a JWT token
          const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            "iddy",
            { expiresIn: "1h" }
          );

          // Return the new user and token
          res.status(201).json({ ...newUser, token });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if both fields are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Both email and password are required" });
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

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // Payload
      "iddy", // Secret key (replace with environment variable in production)
      { expiresIn: "10m" } //
    );

    // Return the token and user data
    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

// Token validation endpoint
router.get("/validateToken", verifyToken, (req, res) => {
  // If the token is valid, return success
  res.status(200).json({ success: true, user: req.user });
});

// Get user by ID
router.get("/user/:id", verifyToken, (req, res) => {
  const userId = req.params.id;

  // Query the database to find the user by ID
  const sql = "SELECT id, name, email, dob, incomeRange FROM user WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    // If no user is found
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user data
    const user = results[0];
    res.status(200).json({ success: true, user });
  });
});

//CREATE
// Registration route (assuming you already have a User model)
// router.post('/user', async (req, res) => {
//   const { username, email, password, dob } = req.body;

//   // Basic validation
//

// REGISTER WITHOUT TOKEN
// router.post('/user', async (req, res) => {
//   try {
//     const { name, email, password, dob, incomeRange } = req.body;

//     // Validate required fields
//     if (!name || !email || !password || !dob || !incomeRange) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = { name, email, password: hashedPassword, dob, incomeRange };

//     const sql = "INSERT INTO user (name, email, password, dob, incomeRange) VALUES (?, ?, ?, ?, ?)";
//     db.query(sql, [name, email, hashedPassword, dob, incomeRange], (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: "Database error", details: err });
//       }

//       newUser.id = result.insertId;

//       res.status(201).json(newUser);
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// LOGIN WITHOUT TOKEN
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // Check if both fields are provided
//   if (!email || !password) {
//     return res.status(400).json({ error: "Both email and password are required" });
//   }

//   // Query the database to find a user with the given email
//   const sql = "SELECT * FROM user WHERE email = ?";
//   db.query(sql, [email], async (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Database error", details: err });
//     }

//     // If no user is found
//     if (results.length === 0) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     const user = results[0];

//     // Compare the provided password with the hashed password in the database
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // If the email and password match, return a success message or token (if using JWT for example)
//     res.json({ success: true, message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
//   });
// });

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // Check if both fields are provided
//   if (!email || !password) {
//     return res.status(400).json({ error: "Both email and password are required" });
//   }

//   // Query the database to find a user with the given email
//   const sql = "SELECT * FROM user WHERE email = ?";
//   db.query(sql, [email], async (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Database error", details: err });
//     }

//     // If no user is found
//     if (results.length === 0) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     const user = results[0];

//     // Compare the provided password with the hashed password in the database
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role }, // Payload
//       "iddy", // Secret key (replace with environment variable in production)
//       { expiresIn: "2w" } // Token expiration
//     );

//     // Return the token and user data
//     res.json({
//       success: true,
//       token,
//       user: { id: user.id, name: user.name, email: user.email },
//     });
//   });
// });

// // Token validation endpoint
// router.get("/validateToken", verifyToken, (req, res) => {
//   // If the token is valid, return success
//   res.status(200).json({ success: true, user: req.user });
// });

// // Get user by ID
// router.get("/user/:id", verifyToken, (req, res) => {
//   const userId = req.params.id;

//   // Query the database to find the user by ID
//   const sql = "SELECT id, name, email, dob, incomeRange FROM user WHERE id = ?";
//   db.query(sql, [userId], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Database error", details: err });
//     }

//     // If no user is found
//     if (results.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Return the user data
//     const user = results[0];
//     res.status(200).json({ success: true, user });
//   });
// });

//CREATE
router.post("/expenses", (req, res) => {
  console.log(req.body);
  const bill = req.body.bill;
  const pNumber = req.body.pNumber;
  const mPayment = req.body.mPayment;
  const amount = req.body.amount;
  const dob = req.body.date;
  const reference = req.body.reference;
  const userid = req.body.user_id;

  const newTodo = { bill, pNumber, mPayment, amount, dob, reference, userid };

  console.log(newTodo.title);
  const sql =
    "INSERT INTO expenses (bill, pNumber, mPayment, amount, date, reference, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [bill, pNumber, mPayment, amount, dob, reference, userid],
    (err, result) => {
      if (err) {
        throw err;
      }
      newTodo.id = result.insertId;
      res.json(newTodo);
    }
  );
});

router.post("/income", (req, res) => {
  const pNumber = req.body.pNumber;
  const mPayment = req.body.mPayment;
  const amount = req.body.amount;
  const dob = req.body.date;
  const reference = req.body.reference;
  const userid = req.body.user_id;

  const newTodo = { pNumber, mPayment, amount, dob, reference, userid };

  console.log(newTodo.title);
  const sql =
    "INSERT INTO income (pNumber, mPayment, amount, date, reference, user_id) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [pNumber, mPayment, amount, dob, reference, userid],
    (err, result) => {
      if (err) {
        throw err;
      }
      newTodo.id = result.insertId;
      res.json(newTodo);
    }
  );
});

// GET route to fetch data from the payment table
// 1. Make sure the route uses authMiddleware
router.get("/getpayment", authenticateToken, (req, res) => {
  const userId = req.user.id; // Extracted from JWT token

  // 2. Fetch expenses only for this user
  const sql = "SELECT * FROM expenses WHERE user_id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // Returns only the user's expenses
  });
});

router.get("/getincome", authenticateToken, (req, res) => {
  const userId = req.user.id; // Extracted from JWT token

  const sql = "SELECT * FROM income WHERE user_id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // Returns only the user's income
  });
});

// GET route to fetch page content
router.get("/api/page-content/:pageName", (req, res) => {
  const pageName = req.params.pageName;
  const sql = "SELECT * FROM page_content WHERE page_name = ?";

  db.query(sql, [pageName], (err, results) => {
    if (err) {
      console.error("Error fetching content:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching content" });
    }

    // If no results found, return default content
    if (results.length === 0) {
      return res.json({
        title:
          "Kuimarisha wajasiriamali kwa ufuatiliaji rahisi wa rekodi za mapato na matumizi.",
        description:
          "Tunawasaidia wajasiriamali walio rasmi kuwa na taarifa kuhusu mapato na matumizi yao ili wawe na muhtasari mzuriwa fedha zao",
      });
    }

    res.json(results[0]);
  });
});

// POST route to add/update page content
router.post("/page-content", (req, res) => {
  const { title, description, pageName } = req.body;

  const sql =
    "INSERT INTO page_content (title, description, page_name) VALUES (?, ?, ?)";
  db.query(sql, [title, description, pageName], (err, result) => {
    if (err) {
      console.error("Error saving content:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while saving content" });
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

// Modify the route to include the middleware
router.get("/userInfo", authenticateToken, (req, res) => {
  const userId = req.user.id; // Now req.user is populated by the middleware

  const sql = "SELECT name, email, dob, incomeRange FROM user WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
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
      incomeRange: user.incomeRange,
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
router.get("/userStatistics", authenticateToken, (req, res) => {
  const userId = req.user.id; // Get from JWT token

  // Query for income (filtered by user)
  const incomeSql =
    "SELECT SUM(amount) AS totalIncome FROM income WHERE user_id = ?";

  // Query for expenses (filtered by user)
  const expensesSql =
    "SELECT SUM(amount) AS totalExpenses FROM expenses WHERE user_id = ?";

  // Execute both queries in parallel
  Promise.all([
    new Promise((resolve, reject) => {
      db.query(incomeSql, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0]?.totalIncome || 0);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(expensesSql, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0]?.totalExpenses || 0);
      });
    }),
  ])
    .then(([totalIncome, totalExpenses]) => {
      res.json({
        totalIncome,
        totalExpenses,
        netBalance: totalIncome - totalExpenses,
      });
    })
    .catch((err) => {
      console.error("Database error:", err);
      res.status(500).json({ error: "Failed to calculate statistics" });
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
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

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
