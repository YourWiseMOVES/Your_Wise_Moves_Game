/**  Function Should:
 * run when a user elects to receive journal in an email
 * generate results to be dispatched to users
 * dispatch results in an email
*/

//STILL A WORK IN PROGRESS

const transporter = require('../../modules/transporter'); //configures nodemailer with sender info
const mailOptions = require('../../modules/mailOptions'); //configures nodemailer with recipiant info

const dispatch = () => {
    

    transporter.sendMail(mailConfig, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
      });
}



module.exports = dispatch;