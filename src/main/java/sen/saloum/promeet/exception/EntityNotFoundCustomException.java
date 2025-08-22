package sen.saloum.promeet.exception;

public class EntityNotFoundCustomException extends RuntimeException {

    private final Long entityId;
    private final String entityName;

    public EntityNotFoundCustomException(String entityName, Long entityId) {
        super(entityName + " non trouvé avec l'id : " + entityId);
        this.entityName = entityName;
        this.entityId = entityId;
    }

    public Long getEntityId() {
        return entityId;
    }

    public String getEntityName() {
        return entityName;
    }
}
