package sen.saloum.promeet.utils;

import org.springframework.http.HttpStatus;

public final class ApiResponseStatus {

    private ApiResponseStatus() {
    }

    public static final HttpStatus OK = HttpStatus.OK; // 200
    public static final HttpStatus CREATED = HttpStatus.CREATED; // 201
    public static final HttpStatus NO_CONTENT = HttpStatus.NO_CONTENT; // 204
    public static final HttpStatus NOT_FOUND = HttpStatus.NOT_FOUND; // 404
    public static final HttpStatus BAD_REQUEST = HttpStatus.BAD_REQUEST; // 400
    public static final HttpStatus UNAUTHORIZED = HttpStatus.UNAUTHORIZED; // 401
    public static final HttpStatus FORBIDDEN = HttpStatus.FORBIDDEN; // 403
    public static final HttpStatus INTERNAL_ERROR = HttpStatus.INTERNAL_SERVER_ERROR; // 500

    public static final String SUCCESS_MESSAGE = "Opération réussie";
    public static final String CREATED_MESSAGE = "Créé avec succès";
    public static final String NOT_FOUND_MESSAGE = "Ressource non trouvée";
    public static final String ERROR_MESSAGE = "Une erreur est survenue";

}
