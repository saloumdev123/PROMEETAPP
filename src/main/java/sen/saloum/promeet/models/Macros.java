package sen.saloum.promeet.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class Macros {
    private String cv;
    private String lm;
    private String cvFibem;
    private String priseDeNotes;

    public String getCv() {
        return cv;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

    public String getLm() {
        return lm;
    }

    public void setLm(String lm) {
        this.lm = lm;
    }

    public String getCvFibem() {
        return cvFibem;
    }

    public void setCvFibem(String cvFibem) {
        this.cvFibem = cvFibem;
    }

    public String getPriseDeNotes() {
        return priseDeNotes;
    }

    public void setPriseDeNotes(String priseDeNotes) {
        this.priseDeNotes = priseDeNotes;
    }
}