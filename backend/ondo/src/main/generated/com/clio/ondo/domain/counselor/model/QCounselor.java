package com.clio.ondo.domain.counselor.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCounselor is a Querydsl query type for Counselor
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCounselor extends EntityPathBase<Counselor> {

    private static final long serialVersionUID = -1283474331L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCounselor counselor = new QCounselor("counselor");

    public final StringPath counselorId = createString("counselorId");

    public final StringPath field = createString("field");

    public final EnumPath<com.clio.ondo.domain.member.model.Gender> gender = createEnum("gender", com.clio.ondo.domain.member.model.Gender.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath profileUrl = createString("profileUrl");

    public final ListPath<com.clio.ondo.domain.reservation.model.Reservation, com.clio.ondo.domain.reservation.model.QReservation> reservations = this.<com.clio.ondo.domain.reservation.model.Reservation, com.clio.ondo.domain.reservation.model.QReservation>createList("reservations", com.clio.ondo.domain.reservation.model.Reservation.class, com.clio.ondo.domain.reservation.model.QReservation.class, PathInits.DIRECT2);

    public final com.clio.ondo.domain.schedule.model.QSchedule schedule;

    public final StringPath selfIntroduction = createString("selfIntroduction");

    public QCounselor(String variable) {
        this(Counselor.class, forVariable(variable), INITS);
    }

    public QCounselor(Path<? extends Counselor> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCounselor(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCounselor(PathMetadata metadata, PathInits inits) {
        this(Counselor.class, metadata, inits);
    }

    public QCounselor(Class<? extends Counselor> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.schedule = inits.isInitialized("schedule") ? new com.clio.ondo.domain.schedule.model.QSchedule(forProperty("schedule"), inits.get("schedule")) : null;
    }

}

