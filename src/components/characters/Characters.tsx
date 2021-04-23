import React, { useState } from 'react';

import Link from 'next/link';

import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { ICharacter, IPeopleResponse} from '../../types';

type Props = {
  persons: IPeopleResponse;
};

/**
 * Hjálpar týpa ef við erum að filtera burt hugsanleg null gildi:
 *
 * const items: T = itemsWithPossiblyNull
 *  .map((item) => {
 *    if (!item) {
 *      return null;
 *    }
 *    return item;
 *  })
 *  .filter((Boolean as unknown) as ExcludesFalse);
 * items verður Array<T> en ekki Array<T | null>
 */
type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

export function Characters({ persons }: Props): JSX.Element {
  // TODO meðhöndla loading state, ekki þarf sérstaklega að villu state
  const [loading, setLoading] = useState<boolean>(false);

  // TODO setja grunngögn sem koma frá server
  const [characters, setCharacters] = useState<Array<ICharacter>>(persons.allPeople.people);

  const [nextPage, setNextPage] = useState<string | null>(persons.allPeople.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState<boolean>(persons.allPeople.pageInfo.hasNextPage);

  const fetchMore = async (): Promise<void> => {
    // TODO sækja gögn frá /pages/api/characters.ts (gegnum /api/characters), ef það eru fleiri
    // (sjá pageInfo.hasNextPage) með cursor úr pageInfo.endCursor
    if (hasNextPage === true) {
      setLoading(true);

      const data = await fetch(`/api/characters?after=${nextPage}`);
      const jsonData = await data.json();
      setCharacters(characters.concat(jsonData.allPeople.people));
      setNextPage(jsonData.allPeople.pageInfo.endCursor);
      setHasNextPage(jsonData.allPeople.pageInfo.hasNextPage);
      setLoading(false);
    }
    
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>

      <Button disabled={loading} onClick={fetchMore}>Fetch more</Button>
    </section>
  );
}
