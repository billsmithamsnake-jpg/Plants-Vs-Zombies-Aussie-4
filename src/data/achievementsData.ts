export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'crap';
  iconSymbol: string;
  howToGet: string;
}

export const ALL_ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first_lawn',
    title: 'First Lawn Defense',
    description: 'Successfully defend your Outback lawn in Level 1.',
    tier: 'bronze',
    iconSymbol: '🌱',
    howToGet: 'Complete Level 1: Front Lawn',
  },
  {
    id: 'barbie_master',
    title: 'Barbie Master',
    description: 'Plant 5 Grillflowers in a single battle.',
    tier: 'bronze',
    iconSymbol: '🔥',
    howToGet: 'Plant 5 Grillflowers on the lawn in one match',
  },
  {
    id: 'spud_boom',
    title: 'Sour Bomber',
    description: 'Vanquish an incoming zombie using an armed Lemon Mine.',
    tier: 'bronze',
    iconSymbol: '🍋',
    howToGet: 'Blow up a zombie with an armed Lemon Mine',
  },
  {
    id: 'prawn_collector',
    title: 'Prawn Hoarder',
    description: 'Accumulate 1,000 total Prawns across your Outback battles.',
    tier: 'bronze',
    iconSymbol: '🦐',
    howToGet: 'Collect 1,000 Prawns during gameplay',
  },
  {
    id: 'vault_interceptor',
    title: 'Vault Interceptor',
    description: 'Vanquish a Pole Vaulter zombie before it reaches your lawn mowers.',
    tier: 'silver',
    iconSymbol: '🏃',
    howToGet: 'Defeat a Pole Vaulter in Level 3 or higher',
  },
  {
    id: 'bucket_crusher',
    title: 'Bucket Crusher',
    description: 'Destroy 5 heavy Buckethead zombies.',
    tier: 'silver',
    iconSymbol: '🪣',
    howToGet: 'Vanquish 5 Buckethead zombies',
  },
  {
    id: 'koala_tamer',
    title: 'Koala Tamer',
    description: 'Defeat a Koala Imp after it parachutes into your defenses.',
    tier: 'silver',
    iconSymbol: '🐨',
    howToGet: 'Vanquish a Koala Imp in Level 4 or 5',
  },
  {
    id: 'outback_hero',
    title: 'Outback Veteran',
    description: 'Unlock and reach Level 6: The Solitary Sandstone Titan.',
    tier: 'silver',
    iconSymbol: '🦘',
    howToGet: 'Unlock Level 6 in your campaign',
  },
  {
    id: 'golden_meat_pie',
    title: 'Golden Meat Pie Trophy',
    description: 'Defeat the Sandstone Titan in Level 6 and receive Aussie Joe\'s legendary Golden Meat Pie reward!',
    tier: 'gold',
    iconSymbol: '🥧',
    howToGet: 'Complete Level 6 and receive Aussie Joe\'s final reward!',
  },
  {
    id: 'pro_void_master',
    title: 'Void Sandstone Champion Trophy',
    description: 'Conquer all 6 Secret Pro Void levels and defeat the 7,200 HP Void Sandstone Titan!',
    tier: 'gold',
    iconSymbol: '🌌',
    howToGet: 'Complete Pro Mode Level 12 (Pro Level 6) to claim the ultimate Void Trophy!',
  },
  {
    id: 'trophy_exe',
    title: 'Trophy.EXE',
    description: 'Entered the secret code Trophy into the admin panel!',
    tier: 'gold',
    iconSymbol: '💾',
    howToGet: 'Type Trophy into the Admin Panel passcode field.',
  },
  {
    id: 'punch_coded_gut',
    title: 'Punch In The Coded Gut',
    description: 'Defeated Aussie Joe and his 1,000,000 HP Crocodile in the secret glitch showdown!',
    tier: 'gold',
    iconSymbol: '👊',
    howToGet: 'Defeat Aussie Joe in the secret matrix finale.',
  },
  {
    id: 'unlocked_meatcan',
    title: 'Aussie Meatcan Trophy',
    description: 'Unlocked the secret Meatcan plant with Aussie Joe\'s secret note!',
    tier: 'gold',
    iconSymbol: '🥫',
    howToGet: 'Type SorryForEverything into the Admin Panel passcode field.',
  },
  {
    id: 'cheated_like_a_baby',
    title: 'Crap Trophy: Cheater Baby',
    description: 'This trophy was rewarded to {PROFILE_NAME} after activating a cheat code like a baby.',
    tier: 'crap',
    iconSymbol: '💩',
    howToGet: 'Type IAMABABY in full capital letters into the Admin Panel passcode field.',
  },
];
