/**
 * 숙련도(level) 기준 내림차순으로 정렬된 새 스킬 배열을 반환한다.
 *
 * @param {Array} skills - 정렬할 스킬 배열 [Required]
 * @returns {Array} 숙련도 내림차순으로 정렬된 스킬 배열
 */
export function sortSkillsByLevel(skills) {
  return [...skills].sort((a, b) => b.level - a.level);
}

/**
 * 숙련도가 높은 순으로 상위 N개의 스킬을 반환한다. (홈 탭 메인 스킬 노출용)
 *
 * @param {Array} skills - 대상 스킬 배열 [Required]
 * @param {number} count - 선택할 상위 스킬 개수 [Optional, 기본값: 3]
 * @returns {Array} 상위 N개 스킬 배열
 */
export function getTopSkills(skills, count = 3) {
  return sortSkillsByLevel(skills).slice(0, count);
}
