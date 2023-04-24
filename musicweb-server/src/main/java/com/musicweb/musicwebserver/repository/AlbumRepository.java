package com.musicweb.musicwebserver.repository;

import com.musicweb.musicwebserver.model.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AlbumRepository extends JpaRepository<Album, Long>,
        JpaSpecificationExecutor<Album> {
}
