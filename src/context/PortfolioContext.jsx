import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getTopSkills } from '../utils/skillUtils';
import profilePhoto from '../assets/images/profile-photo.jpeg';

const PortfolioContext = createContext(null);

const initialAboutMeData = {
  basicInfo: {
    name: '서수인',
    education: '홍익대학원 의상디자인학과',
    major: '의상디자인',
    experience: '2년',
    photo: profilePhoto,
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content: '고등학생 때 문득 길을 가다가 "내가 디자인한 옷을 입은 사람을 보면 매우 뿌듯하겠다." 라는 생각으로 패션디자이너에 대한 꿈을 품게 되었습니다. 그래서 가장 먼저 패션디자인학과에 들어가기 위해 미술학원을 등록하고 미술을 공부했고, 패션디자인학과에서 공부하다보니 대학교에서 배우는 과정만으로는 배움이 부족한 것 같아 대학원의 진학을 자연스레 생각하게 되었습니다. 그래서 홍익대학교 일반대학원에 들어가게 되었고 깊은 배움의 시간과 다양한 경험을 바탕으로 패션디자인에 좀 더 가까워질 수 있는 시간이었습니다. 그러나, 광주에 내려와보니 광주에는 패션디자인이라는 전공을 살릴 기회가 많이 없어 웹디자인으로 영역을 넓혀 좀 더 확장된 디자인영역에서 활동하고 싶은 마음이 생겨 웹디자인과 관련된 스킬을 배우고 있습니다.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: '전체적인 분위기가 자연스럽게 어우러져야한다고 생각하고, 그것을 사용하고 받아들이는 상대방의 마음이 불편함이 있으면 안된다고 생각합니다.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: '요즘 저의 관심사는 생뚱맞게 연예인 박지훈에게 있습니다. 어릴 때부터 연예인을 좋아하는 편이긴 했지만 이렇게 진심으로 좋아한 적은 없었던 것 같습니다. 박지훈이라는 사람을 알게 되고, 연예인으로서 가수로서, 배우로서 주어진 일을 어떠한 시간과 노력을 들여서라도 완벽히 해내고자하는 그런 마인드가 너무 멋있다 생각했고 닮고싶다고 생각했습니다. 나이는 저보다 어린데 더 어른스럽고, 상대방을 대할 때 매너나 예의, 배려가 몸에 베어있는 습관이 박지훈이라는 사람에 대한 팬심과 애정을 더 키우게 했습니다. 단순히 연예인 박지훈으로서 그를 좋아하는 것이 아닌 사람으로서 좋아하게 돼서 지금껏 해보지 못한 팬심가득한 응원을 하고 있습니다. 이 나이에 이러는 게 맞나 가끔 제 자신이 한심하다고 생각될 때도 있지만 사람이 사람을 좋아하는 것은 당연하고, 지루하고 기대되지 않던 저의 일상을 행복하게하고 웃게해주는 사람이 생겼다는게 저는 정말 감사하고, 박지훈님이 알아주셨으면 좋을만큼 정말 진심으로 고마운 마음이며, 그 말을 듣고 박지훈님도 행복하셨으면 좋겠습니다.',
      showInHome: false,
    },
  ],
  skills: [
    {
      id: 'html',
      name: 'HTML',
      level: 70,
      category: 'Frontend',
      icon: 'Html',
      description: '웹 페이지의 구조를 작성하는 마크업 언어',
      showInMain: true,
    },
    {
      id: 'css',
      name: 'CSS',
      level: 70,
      category: 'Frontend',
      icon: 'Css',
      description: '웹 페이지의 스타일과 레이아웃을 담당하는 언어',
      showInMain: true,
    },
    {
      id: 'illust',
      name: 'Illust',
      level: 90,
      category: 'Design',
      icon: 'Brush',
      description: '벡터 기반 그래픽 디자인 툴, 로고와 일러스트 제작',
      showInMain: true,
    },
    {
      id: 'photoshop',
      name: 'Photoshop',
      level: 90,
      category: 'Design',
      icon: 'Image',
      description: '이미지 편집 및 합성에 특화된 디자인 툴',
      showInMain: true,
    },
    {
      id: 'figma',
      name: 'Figma',
      level: 80,
      category: 'Design',
      icon: 'DesignServices',
      description: 'UI/UX 디자인과 협업에 특화된 디자인 툴',
      showInMain: true,
    },
    {
      id: 'java',
      name: 'Java',
      level: 50,
      category: 'Backend',
      icon: 'Terminal',
      description: '객체지향 프로그래밍 언어, 백엔드 시스템 개발에 활용',
      showInMain: false,
    },
    {
      id: 'git',
      name: 'Git',
      level: 50,
      category: 'Tools & Etc',
      icon: 'GitHub',
      description: '소스 코드 버전 관리 도구',
      showInMain: false,
    },
  ],
};

const additionalSkillsPool = [
  { id: 'vue', name: 'Vue.js', level: 50, category: 'Frontend', icon: 'Code', description: '반응형 UI를 만드는 프론트엔드 프레임워크', showInMain: false },
  { id: 'angular', name: 'Angular', level: 50, category: 'Frontend', icon: 'Code', description: '대규모 SPA 개발에 적합한 프론트엔드 프레임워크', showInMain: false },
  { id: 'typescript', name: 'TypeScript', level: 50, category: 'Frontend', icon: 'Language', description: '정적 타입을 지원하는 자바스크립트 상위 언어', showInMain: false },
  { id: 'nodejs', name: 'Node.js', level: 50, category: 'Backend', icon: 'Terminal', description: '자바스크립트 런타임 기반 서버 개발 환경', showInMain: false },
  { id: 'python', name: 'Python', level: 50, category: 'Backend', icon: 'Terminal', description: '범용 프로그래밍 언어, 데이터/백엔드 개발에 활용', showInMain: false },
  { id: 'react-native', name: 'React Native', level: 50, category: 'Tools & Etc', icon: 'PhoneIphone', description: '하나의 코드로 모바일 앱을 만드는 프레임워크', showInMain: false },
  { id: 'mongodb', name: 'MongoDB', level: 50, category: 'Tools & Etc', icon: 'Storage', description: '문서 기반의 NoSQL 데이터베이스', showInMain: false },
];

const HOME_SUMMARY_LENGTH = 100;

/**
 * PortfolioProvider 컴포넌트
 *
 * About Me 탭의 데이터(기본 정보, 콘텐츠 섹션, 스킬)를 전역 상태로 관리하고
 * 홈 탭에서 사용할 요약 데이터(getHomeData)를 함께 제공한다.
 *
 * Props:
 * @param {node} children - Provider 하위에서 렌더링될 컴포넌트 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState(initialAboutMeData);

  const updateSectionContent = useCallback((sectionId, content) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, content } : section
      ),
    }));
  }, []);

  const addSkill = useCallback((skill) => {
    setAboutMeData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
  }, []);

  const updateSkillLevel = useCallback((skillId, level) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === skillId ? { ...skill, level } : skill)),
    }));
  }, []);

  const availableSkills = useMemo(
    () => additionalSkillsPool.filter((skill) => !aboutMeData.skills.some((added) => added.id === skill.id)),
    [aboutMeData.skills]
  );

  const homeData = useMemo(() => {
    const homeContent = aboutMeData.sections
      .filter((section) => section.showInHome)
      .map((section) => ({
        id: section.id,
        title: section.title,
        summary:
          section.content.length > HOME_SUMMARY_LENGTH
            ? `${section.content.slice(0, HOME_SUMMARY_LENGTH)}...`
            : section.content,
      }));

    return {
      content: homeContent,
      skills: getTopSkills(aboutMeData.skills, 4),
      basicInfo: aboutMeData.basicInfo,
    };
  }, [aboutMeData]);

  const value = useMemo(
    () => ({
      aboutMeData,
      availableSkills,
      homeData,
      updateSectionContent,
      addSkill,
      updateSkillLevel,
    }),
    [aboutMeData, availableSkills, homeData, updateSectionContent, addSkill, updateSkillLevel]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

/**
 * usePortfolio 훅
 *
 * PortfolioProvider 하위에서 포트폴리오 데이터와 업데이트 함수에 접근한다.
 *
 * Example usage:
 * const { aboutMeData, homeData, updateSectionContent } = usePortfolio();
 */
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio는 PortfolioProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
