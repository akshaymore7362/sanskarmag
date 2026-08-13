const photo = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=82`;

export const articlePhotos = {
  cover: photo("photo-1497366754035-f200968a6e72", 1600, 980),
  technology: photo("photo-1518770660439-4636190af475", 1200, 820),
  business: photo("photo-1486406146926-c627a92ad1ab", 1200, 820),
  startups: photo("photo-1559136555-9303baea8ebd", 1200, 820),
  leadership: photo("photo-1542744173-8e7e53415bb0", 1200, 820),
  finance: photo("photo-1449824913935-59a10b8d2000", 1200, 820),
  economy: photo("photo-1451187580459-43490279c0fa", 1200, 820),
  healthcare: photo("photo-1576091160399-112ba8d25d1d", 1200, 820),
  innovation: photo("photo-1551288049-bebda4e38f71", 1200, 820),
  culture: photo("photo-1521737604893-d14cc237f11d", 1200, 820),
  energy: photo("photo-1509391366360-2e959784a276", 1200, 820),
  manufacturing: photo("photo-1513828583688-c52646db42da", 1200, 820),
  work: photo("photo-1504384308090-c894fdcc538d", 1200, 820),
  meeting: photo("photo-1517048676732-d65bc937f952", 1200, 820),
  city: photo("photo-1486406146926-c627a92ad1ab", 1200, 820),
};

export const industryPhotos = {
  technology: photo("photo-1518770660439-4636190af475", 900, 640),
  business: photo("photo-1497366811353-6870744d04b2", 900, 640),
  finance: photo("photo-1444653614773-995cb1ef9efa", 900, 640),
  healthcare: photo("photo-1576091160550-2173dba999ef", 900, 640),
  realEstate: photo("photo-1486406146926-c627a92ad1ab", 900, 640),
  education: photo("photo-1503676260728-1c00da094a0b", 900, 640),
  startups: photo("photo-1559136555-9303baea8ebd", 900, 640),
  manufacturing: photo("photo-1513828583688-c52646db42da", 900, 640),
  energy: photo("photo-1509391366360-2e959784a276", 900, 640),
  leadership: photo("photo-1552664730-d307ca884978", 900, 640),
  retail: photo("photo-1441986300917-64674bd600d8", 900, 640),
  media: photo("photo-1495020689067-958852a7765e", 900, 640),
};

export const leaderPhotos = [
  photo("photo-1500648767791-00dcc994a43e", 520, 720),
  photo("photo-1573496359142-b8d87734a5a2", 520, 720),
  photo("photo-1506794778202-cad84cf45f1d", 520, 720),
  photo("photo-1580489944761-15a19d654956", 520, 720),
  photo("photo-1534528741775-53994a69daeb", 520, 720),
  photo("photo-1560250097-0b93528c311a", 520, 720),
  photo("photo-1551836022-d5d88e9218df", 520, 720),
  photo("photo-1556157382-97eda2d62296", 520, 720),
  photo("photo-1438761681033-6461ffad8d80", 520, 720),
  photo("photo-1544723795-3fb6469f5b39", 520, 720),
  photo("photo-1547425260-76bcadfb4f2c", 520, 720),
  photo("photo-1494790108377-be9c29b29330", 520, 720),
];

export const eventPhotos = {
  summit: photo("photo-1511578314322-379afb476865", 1300, 760),
  fintech: photo("photo-1559526324-593bc073d938", 1300, 760),
  healthcare: photo("photo-1576091160550-2173dba999ef", 1300, 760),
  startups: photo("photo-1556761175-b413da4baf72", 1300, 760),
  energy: photo("photo-1509391366360-2e959784a276", 1300, 760),
  manufacturing: photo("photo-1513828583688-c52646db42da", 1300, 760),
  retail: photo("photo-1441986300917-64674bd600d8", 1300, 760),
  media: photo("photo-1495020689067-958852a7765e", 1300, 760),
};

export const magazinePhotos = [
  photo("photo-1497366754035-f200968a6e72", 800, 1100),
  photo("photo-1486406146926-c627a92ad1ab", 800, 1100),
  photo("photo-1518770660439-4636190af475", 800, 1100),
  photo("photo-1559136555-9303baea8ebd", 800, 1100),
  photo("photo-1451187580459-43490279c0fa", 800, 1100),
  photo("photo-1542744173-8e7e53415bb0", 800, 1100),
  photo("photo-1500530855697-b586d89ba3ee", 800, 1100),
  photo("photo-1521737604893-d14cc237f11d", 800, 1100),
];
