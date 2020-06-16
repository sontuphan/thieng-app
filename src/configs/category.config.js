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
  { value: 'chairs', name: 'Ghế', icon: <FaChair /> },
  { value: 'desks', name: 'Bàn', icon: <GiDesk /> },
  { value: 'floor', name: 'Sàn gỗ', icon: <MdTexture /> },
  { value: 'light', name: 'Đèn', icon: <GiCeilingLight /> },
  { value: 'bedroom', name: 'Phòng ngủ', icon: <GiBedLamp /> },
  { value: 'playground', name: 'Sân chơi', icon: <FaTableTennis /> },
  { value: 'kitchen', name: 'Nhà bếp', icon: <GiCookingPot /> },
  { value: 'garden', name: 'Vườn', icon: <FaTree /> },
  { value: 'others', name: 'Khác', icon: <FaDice /> },
]
const fullList = [{ value: 'all', name: 'Tất cả', icon: <TiSortAlphabetically /> }].concat(pureList);
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