package iocv.app.components;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.mail.internet.InternetAddress;
import java.io.UnsupportedEncodingException;

@Component
public class EmailServiceImpl {
    private  JavaMailSender javaMailSneder;
    @Autowired
    public EmailServiceImpl(JavaMailSender sender) {
        this.javaMailSneder = sender;
    }
    public void sendSimpleMessage( String from, String subject, String text) throws UnsupportedEncodingException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(String.valueOf(new InternetAddress(from,from)));
        message.setReplyTo(from);

        message.setTo("ousabdelwahed@gmail.com");
        message.setSubject(subject);
        message.setText(text);
        javaMailSneder.send(message);
    }
}
