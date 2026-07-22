import { useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS = {
  typingSpeed: 90,
  deletingSpeed: 45,
  pauseDuration: 1400,
};

/**
 * useTypingMorph 훅
 * 여러 단어를 타이핑 → 잠시 정지 → 삭제 순으로 반복하며 전환하는 텍스트 모핑 효과를 만든다.
 *
 * @param {string[]} words - 순환 표시할 단어 배열 [Required]
 * @param {object} options - 옵션 객체 [Optional]
 * @param {number} options.typingSpeed - 한 글자를 타이핑하는 간격(ms) [Optional, 기본값: 90]
 * @param {number} options.deletingSpeed - 한 글자를 지우는 간격(ms) [Optional, 기본값: 45]
 * @param {number} options.pauseDuration - 완성된 단어를 유지하는 시간(ms) [Optional, 기본값: 1400]
 *
 * Example usage:
 * const { text, isPaused, togglePause } = useTypingMorph(['개발자', '디자이너', '크리에이터']);
 */
function useTypingMorph(words, options = {}) {
  const { typingSpeed, deletingSpeed, pauseDuration } = { ...DEFAULT_OPTIONS, ...options };
  const [text, setText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [tick, setTick] = useState(0);

  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const phase = useRef('typing');

  useEffect(() => {
    if (isPaused || words.length === 0) return undefined;

    const currentWord = words[wordIndex.current % words.length];
    const delay =
      phase.current === 'typing' ? typingSpeed : phase.current === 'deleting' ? deletingSpeed : pauseDuration;

    const timer = setTimeout(() => {
      if (phase.current === 'typing') {
        charIndex.current += 1;
        setText(currentWord.slice(0, charIndex.current));
        if (charIndex.current >= currentWord.length) {
          phase.current = 'pausing';
        }
      } else if (phase.current === 'pausing') {
        phase.current = 'deleting';
      } else {
        charIndex.current -= 1;
        setText(currentWord.slice(0, charIndex.current));
        if (charIndex.current <= 0) {
          phase.current = 'typing';
          wordIndex.current += 1;
        }
      }
      setTick((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [tick, isPaused, words, typingSpeed, deletingSpeed, pauseDuration]);

  const togglePause = () => setIsPaused((prev) => !prev);

  return { text, isPaused, togglePause };
}

export default useTypingMorph;
