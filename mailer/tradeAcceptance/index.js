const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const sendMail = require("../sendMail");

const emailSource = fs.readFileSync(
  path.join(__dirname, "trade-acceptance.hbs"),
  "utf-8"
);

const template = Handlebars.compile(emailSource);

const mailOptions = (email, locals) => {
  return {
    from: `"TpTrader" <trades@tptrader.com>`,
    to: "triston6@ethereal.email",
    subject: "Your trade offer was accepted!",
    html: template(locals)
  };
};

module.exports = (poster, user, tradeAcceptanceURL) => {
  const { email } = poster;
  const responderEmail = user.email;
  return sendMail(
    mailOptions(user.email, {
      tradeAcceptanceURL,
      email,
      responderEmail
    })
  );
};
