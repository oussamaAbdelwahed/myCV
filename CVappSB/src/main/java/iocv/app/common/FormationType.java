package iocv.app.common;

public enum FormationType {
   DIPLOMA("diplome d etudes"),
   INTERNSHIP_ATTESTATION("attestation du stage");

   private String desc;
   FormationType(String d){
      this.desc = d;
   }
}
