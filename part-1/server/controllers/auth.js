const bcrypt = require("bcryptjs");

const users = [];

module.exports = {
    login: (req, res) => {
        console.log("Logging In User");
        const { username, password } = req.body;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                const matches = bcrypt.compareSync(password, users[i].password);

                if(matches) {
                    console.log("Password matches");
                    const {username, firstName, lastName, email} = users[i];
                    res.status(200).send({username, firstName, lastName, email});
                    return;
                } else {
                    console.log("Password does not match");
                    res.status(403).send("Password incorrect");
                    return;
                }

            }
        }
        res.status(400).send("User not found.");
    },
    register: (req, res) => {
        console.log("Registering User");

        const salt = bcrypt.genSaltSync(5);
        const passHash = bcrypt.hashSync(req.body.password, salt);

        const newUser = { ...req.body, password: passHash };

        console.log(newUser);
        users.push(newUser);
        res.status(200).send(newUser);
    }
};
