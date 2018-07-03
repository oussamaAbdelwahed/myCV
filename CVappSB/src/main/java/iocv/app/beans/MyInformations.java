package iocv.app.beans;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="my_informations")
public class MyInformations {
  @Id
  @GeneratedValue
  private long id;
  private String tel;
  private String email;
  private String address;
  private String zip;
  private String paragraphe;
  private boolean current;
  @CreationTimestamp
  @Column(name = "created_at")
  private Date createdAt;

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public boolean isCurrent() {
        return current;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getParagraphe() {
        return paragraphe;
    }

    public void setParagraphe(String paragraphe) {
        this.paragraphe = paragraphe;
    }

    public boolean getCurrent() {
        return current;
    }

    public void setCurrent(boolean current) {
        this.current = current;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "MyInformations{" +
                "id=" + id +
                ", paragraphe='" + paragraphe + '\'' +
                ", current=" + current +
                ", createdAt=" + createdAt +
                '}';
    }
}
