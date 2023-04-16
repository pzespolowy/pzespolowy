package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.dto.DetailSearchDto;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.repository.AlbumRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;

    public Album getAlbumById(Long id) {
        return albumRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Album with ID " + id + " not found"));
    }

    public Album updateAlbum(Album album) {
        return albumRepository.save(album);
    }

    public List<Album> findAlbums(DetailSearchDto detailSearchDto) {
//        return albumRepository.findAll((root, query, cb) -> {
//            return cb.and(
//                    cb.gt(root.get("ranking"), detailSearchDto.getRankingFrom()),
//                    cb.lt(root.get("ranking"), detailSearchDto.getRankingTo()),
//                    cb.gt(cb.size(root.get("reviews")), detailSearchDto.getNumberOfOpinionsFrom()),
//                    cb.lt(cb.size(root.get("reviews")), detailSearchDto.getNumberOfOpinionsTo())
//                    );
//        });
        return null;
    }
}
