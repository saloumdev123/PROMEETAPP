package sen.saloum.promeet.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(String mesage){
        super(mesage);
    }

}
