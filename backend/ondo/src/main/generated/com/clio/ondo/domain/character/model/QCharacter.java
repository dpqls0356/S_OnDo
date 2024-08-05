package com.clio.ondo.domain.character.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCharacter is a Querydsl query type for Character
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCharacter extends EntityPathBase<Character> {

    private static final long serialVersionUID = 938943239L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCharacter character = new QCharacter("character");

    public final NumberPath<Integer> exp = createNumber("exp", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> level = createNumber("level", Integer.class);

    public final com.clio.ondo.domain.member.model.QMember member;

    public final StringPath name = createString("name");

    public QCharacter(String variable) {
        this(Character.class, forVariable(variable), INITS);
    }

    public QCharacter(Path<? extends Character> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCharacter(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCharacter(PathMetadata metadata, PathInits inits) {
        this(Character.class, metadata, inits);
    }

    public QCharacter(Class<? extends Character> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.clio.ondo.domain.member.model.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

