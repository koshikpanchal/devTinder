const adminAuth = (req, res) => {
  // checking the admin is authorized
  console.log("Admin auth is getting checked");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

const userAuth = (req, res) => {
  // checking the user is authorized
  console.log("user auth is getting checked");
  const token = "abc";
  const isUserAuthorized = token === "abc";
  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};
