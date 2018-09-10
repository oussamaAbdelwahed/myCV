package iocv.app.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Base64;

@Entity
@Table(name="mastered_technologies")
public class Technology {
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private long id;
  @Lob
  @JsonIgnore
  private byte[] technology;
  private byte level;
  private String name;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    @JsonIgnore
    public byte[] getTechnology() {
        return technology;
    }

    @JsonProperty("technology")
    public String getTechImage() {

        return "data:image/jpeg;base64,"+new String(Base64.getEncoder().encode(this.technology));
    }

    public void setTechnology(byte[] technology) {
        this.technology = technology;
    }

    public byte getLevel() {
        return level;
    }

    public void setLevel(byte level) {
        this.level = level;
    }
}
