package iocv.app.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import iocv.app.common.FormationType;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Base64;
import java.util.Date;

@Entity
@Table(name = "formations")
public class Formation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String description;
    @Column(name = "proof_document")
    @Lob
    private byte [] proofDocument;
    @Enumerated(EnumType.STRING)
    private FormationType type;
    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;
    @JsonProperty("proofDocument")
    public  String getDocument() {
        String ext = this.name.substring(this.name.lastIndexOf('.') +1);
        if(ext.equalsIgnoreCase("pdf"))
          return "data:application/pdf;base64,"+ new String(Base64.getEncoder().encode(this.proofDocument));
        else
          return "data:image/jpeg;base64,"+ new String(Base64.getEncoder().encode(this.proofDocument));
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    @JsonIgnore
    public byte[] getProofDocument() {
        return proofDocument;
    }

    public void setProofDocument(byte[] proofDocument) {
        this.proofDocument = proofDocument;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date creatdAt) {
        this.createdAt = creatdAt;
    }

    public FormationType getType() {
        return type;
    }

    public void setType(FormationType type) {
        this.type = type;
    }

}
