package iocv.app.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import iocv.app.common.ImageType;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;


import java.sql.Blob;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

@Entity
@Table(name = "images")
public class CVImage implements Serializable{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    @Lob
    private byte[] image;

    private String name;
    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    @Column(name="image_type")
    private ImageType type;
    @Column(name="show_image")
    private boolean show;
    private String extension;
    @Column(name="created_at")
    @CreationTimestamp
    private Date createdAt;
    private short height;
    private short width;
    private String alt;
    private String description;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    @JsonIgnore
    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
    @JsonIgnore
    public ImageType getImageType() {
        return type;
    }

    @JsonProperty("src")
    public String getImageBase64() {
            return "data:image/jpeg;base64,"+new String(Base64.getEncoder().encode(this.image));
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImageType(ImageType imageType) {
        this.type = imageType;
    }

    public boolean isShow() {
        return show;
    }

    public void setShow(boolean show) {
        this.show = show;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public short getHeight() {
        return height;
    }

    public void setHeight(short height) {
        this.height = height;
    }

    public short getWidth() {
        return width;
    }

    public void setWidth(short width) {
        this.width = width;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "CVImage{" +
                "id=" + id +
                ", image=" + Arrays.toString(image) +
                ", name='" + name + '\'' +
                ", type=" + type +
                ", show=" + show +
                ", extension='" + extension + '\'' +
                ", createdAt=" + createdAt +
                ", height=" + height +
                ", width=" + width +
                ", alt='" + alt + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
