package com.clio.ondo.domain.counselDetail.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCounselDetail is a Querydsl query type for CounselDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCounselDetail extends EntityPathBase<CounselDetail> {

    private static final long serialVersionUID = 1257414401L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCounselDetail counselDetail = new QCounselDetail("counselDetail");

    public final StringPath content = createString("content");

    public final com.clio.ondo.domain.reservation.model.QReservation reservation;

    public QCounselDetail(String variable) {
        this(CounselDetail.class, forVariable(variable), INITS);
    }

    public QCounselDetail(Path<? extends CounselDetail> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCounselDetail(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCounselDetail(PathMetadata metadata, PathInits inits) {
        this(CounselDetail.class, metadata, inits);
    }

    public QCounselDetail(Class<? extends CounselDetail> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.reservation = inits.isInitialized("reservation") ? new com.clio.ondo.domain.reservation.model.QReservation(forProperty("reservation"), inits.get("reservation")) : null;
    }

}

