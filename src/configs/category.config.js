import React from 'react';

import { FaChair, FaTableTennis, FaTree, FaDice } from 'react-icons/fa';
import { GiDesk, GiBedLamp, GiCookingPot, GiCeilingLight } from 'react-icons/gi';
import { MdTexture } from 'react-icons/md';
import { TiSortAlphabetically } from 'react-icons/ti';

/**
 * Contructor
 */
const configs = {}

const pureList = [
  { value: 'chairs', name: 'Chairs', icon: <FaChair /> },
  { value: 'desks', name: 'Desks', icon: <GiDesk /> },
  { value: 'floor', name: 'Floor', icon: <MdTexture /> },
  { value: 'light', name: 'Light', icon: <GiCeilingLight /> },
  { value: 'bedroom', name: 'Bedroom', icon: <GiBedLamp /> },
  { value: 'playground', name: 'Playground', icon: <FaTableTennis /> },
  { value: 'kitchen', name: 'Kitchen', icon: <GiCookingPot /> },
  { value: 'garden', name: 'Garden', icon: <FaTree /> },
  { value: 'others', name: 'Others', icon: <FaDice /> },
]
const fullList = [{ value: 'all', name: 'All', icon: <TiSortAlphabetically /> }].concat(pureList);
const shortList = fullList.filter((item, index) => index <= 5);


/**
 * Development configurations
 */
configs.development = {
  pureList,
  fullList,
  shortList,
}

/**
 * Staging configurations
 */
configs.staging = {
  pureList,
  fullList,
  shortList,
}

/**
 * Production configurations
 */
configs.production = {
  pureList,
  fullList,
  shortList,
}

/**
 * Module exports
 */
export default configs;