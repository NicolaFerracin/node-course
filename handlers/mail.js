const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const sg = require('sendgrid')(process.env.MAIL_API_KEY);
const helper = require('sendgrid').mail;

const generateHtml = (filename, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
    const inlined = juice(html);
    return inlined;
}

exports.send = async (options) => {
    const html = generateHtml(options.filename, options);
    const fromEmail = { email: 'nicola.ferracin@gmail.com', name: 'Nicola Ferracin'};
    const toEmail = { email: options.user.email };
    const subject = options.subject;
    const content = new helper.Content('text/html', html);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);
    
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    const sendMail = sg.API(request);
    console.log(sendMail)
    return sendMail;
}