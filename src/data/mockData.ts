export interface Study {
  id: string;
  pmid: string;
  title: string;
  abstract: string;
  journal: string;
  year: number;
  volume: string;
  issue: string;
  pages: string;
  authors: string[];
  category: string;
  studyType: string;
  quality: number;
  tags: string[];
  compounds: string[];
  pathways: string[];
  readMinutes: number;
  doi: string;
}

export interface Compound {
  id: string;
  name: string;
  synonyms: string[];
  class: string;
  description: string;
  mechanisms: string[];
  interactions: string[];
  evidence: 'human' | 'preclinical' | 'limited';
  structureImg?: string;
}

export interface Goal {
  id: string;
  name: string;
  color: string;
  compounds: string[];
}

export interface Receptor {
  id: string;
  name: string;
  class: string;
  subtype: string;
  region: string;
  ligands: { compound: string; action: string }[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  variants: { name: string; price: number; stock: number }[];
  shipGroups: string[];
  image?: string;
}

export interface Note {
  id: string;
  title: string;
  markdown: string;
  tags: string[];
  tagColors: Record<string, string>;
  connectedCompounds: string[];
  createdAt: string;
  updatedAt: string;
}

export const studies: Study[] = [
  {
    id: '1',
    pmid: '34567890',
    title: 'Effects of Semax on Cognitive Function in Patients with Ischemic Stroke: A Randomized Controlled Trial',
    abstract: 'This double-blind, placebo-controlled study evaluated the cognitive effects of Semax in 120 patients with acute ischemic stroke. Patients received Semax 10mg intranasal twice daily for 30 days. Primary outcomes included MoCA scores, reaction time, and working memory assessments. Results showed significant improvement in cognitive flexibility (p<0.01) and working memory (p<0.05) compared to placebo.',
    journal: 'Journal of Clinical Neuropharmacology',
    year: 2023,
    volume: '46',
    issue: '3',
    pages: '145-158',
    authors: ['Petrov A.', 'Ivanova S.', 'Kuznetsov V.'],
    category: 'Nootropics',
    studyType: 'RCT',
    quality: 4,
    tags: ['cognition', 'stroke', 'neuroprotection'],
    compounds: ['Semax', 'Cerebrolysin'],
    pathways: ['Dopamine', 'Glutamate'],
    readMinutes: 12,
    doi: '10.1097/WNF.0000000000000534'
  },
  {
    id: '2',
    pmid: '35678901',
    title: '9-Me-BC induces dopaminergic neurogenesis in human cell cultures: implications for Parkinson disease therapy',
    abstract: '9-Me-BC (9-methyl-β-carboline) has been shown to promote the growth of dopaminergic neurons in human cell culture models. This study demonstrates that 9-Me-BC at concentrations of 1-10μM stimulates tyrosine hydroxylase expression and increases dopamine production by 280% over 14 days. The compound appears to act through activation of the Wnt/β-catenin pathway.',
    journal: 'Neuropharmacology',
    year: 2022,
    volume: '215',
    issue: '',
    pages: '109-118',
    authors: ['Chen W.', 'Martinez R.', 'Lee J.'],
    category: 'Nootropics',
    studyType: 'preclinical',
    quality: 3,
    tags: ['dopamine', 'neurogenesis', 'Parkinson'],
    compounds: ['9-Me-BC'],
    pathways: ['Dopamine', 'Wnt/β-catenin'],
    readMinutes: 8,
    doi: '10.1016/j.neuropharm.2022.109118'
  },
  {
    id: '3',
    pmid: '36789012',
    title: 'Meta-analysis of Creatine supplementation on cognitive performance in healthy adults',
    abstract: 'This systematic review and meta-analysis included 15 randomized controlled trials (n=784) examining creatine monohydrate supplementation (5-20g/day) on cognitive performance. Significant improvements were found in short-term memory (SMD=0.37, 95%CI 0.12-0.62) and intelligence/reasoning (SMD=0.29, 95%CI 0.05-0.53), particularly under conditions of sleep deprivation or hypoxia.',
    journal: 'Experimental Gerontology',
    year: 2024,
    volume: '187',
    issue: '',
    pages: '112-124',
    authors: ['Williams T.', 'Bergström K.', 'Nakamura H.', 'O\'Brien S.'],
    category: 'Nootropics',
    studyType: 'meta-analysis',
    quality: 5,
    tags: ['creatine', 'memory', 'sleep deprivation', 'ATP'],
    compounds: ['Creatine'],
    pathways: ['ATP/Phosphocreatine', 'Energy metabolism'],
    readMinutes: 15,
    doi: '10.1016/j.exger.2024.112124'
  },
  {
    id: '4',
    pmid: '37890123',
    title: 'Rapamycin and lifespan extension: a systematic review of mammalian studies',
    abstract: 'This systematic review examines 23 studies investigating rapamycin (sirolimus) effects on lifespan and healthspan in mammalian models. Meta-analysis of survival data shows a mean lifespan extension of 9-14% across studies, with the most consistent benefits observed when treatment begins at middle age. mTORC1 inhibition appears to be the primary mechanism.',
    journal: 'Aging Cell',
    year: 2024,
    volume: '23',
    issue: '2',
    pages: 'e14045',
    authors: ['Harrison D.', 'Strong R.', 'Miller R.'],
    category: 'Longevity',
    studyType: 'systematic review',
    quality: 4,
    tags: ['rapamycin', 'mTOR', 'lifespan', 'longevity'],
    compounds: ['Rapamycin'],
    pathways: ['mTOR', 'Autophagy'],
    readMinutes: 18,
    doi: '10.1111/acel.14045'
  },
  {
    id: '5',
    pmid: '38901234',
    title: 'Tianeptine modulation of μ-opioid receptors: clinical implications for mood disorders',
    abstract: 'Tianeptine has been identified as a full agonist at the μ-opioid receptor (MOR), providing a novel mechanism for its antidepressant and anxiolytic effects. This clinical trial (n=240) compared tianeptine 35.5mg TID vs escitalopram 20mg over 12 weeks. Both treatments showed equivalent efficacy for MDD (HAM-D reduction -14.2 vs -13.8), but tianeptine showed faster onset of action (week 2 vs week 4).',
    journal: 'Molecular Psychiatry',
    year: 2023,
    volume: '28',
    issue: '7',
    pages: '2890-2901',
    authors: ['Kasper S.', 'Hammer M.', 'Nielsen R.'],
    category: 'Psychiatry',
    studyType: 'clinical trial',
    quality: 5,
    tags: ['tianeptine', 'opioid', 'depression', 'MOR'],
    compounds: ['Tianeptine'],
    pathways: ['Opioid', 'Serotonin', 'Glutamate'],
    readMinutes: 14,
    doi: '10.1038/s41380-023-02890'
  },
  {
    id: '6',
    pmid: '39012345',
    title: 'Ashwagandha (Withania somnifera) effects on cortisol and stress: a double-blind RCT',
    abstract: 'A 60-day double-blind, placebo-controlled study (n=64) evaluated the efficacy of high-concentration full-spectrum Ashwagandha root extract (600mg/day) on stress and anxiety. Significant reduction in serum cortisol levels (-27.9% vs -7.9% placebo, p<0.001), improvement in HAM-A scores (-56.5% vs -28.7%), and enhanced sleep quality were observed.',
    journal: 'Indian Journal of Psychological Medicine',
    year: 2022,
    volume: '44',
    issue: '4',
    pages: '378-385',
    authors: ['Chandrasekhar K.', 'Kapoor J.', 'Anishetty S.'],
    category: 'Adaptogens',
    studyType: 'RCT',
    quality: 4,
    tags: ['ashwagandha', 'cortisol', 'stress', 'anxiety'],
    compounds: ['Ashwagandha'],
    pathways: ['HPA axis', 'GABA'],
    readMinutes: 10,
    doi: '10.4103/0972-2327.123456'
  },
  {
    id: '7',
    pmid: '40123456',
    title: 'NAC (N-acetylcysteine) as adjunctive therapy in schizophrenia: multicenter RCT',
    abstract: 'This multicenter randomized controlled trial (n=121) examined NAC 2g/day as adjunctive therapy in schizophrenia. Over 24 weeks, NAC showed significant improvement in negative symptoms (PANSS negative subscale: -3.2 vs -0.8, p=0.003) and general psychopathology. Glutathione levels increased by 42% in the NAC group, supporting the oxidative stress hypothesis.',
    journal: 'Biological Psychiatry',
    year: 2023,
    volume: '93',
    issue: '8',
    pages: '712-720',
    authors: ['Berk M.', 'Dean O.', 'Bush A.'],
    category: 'Psychiatry',
    studyType: 'multicenter',
    quality: 5,
    tags: ['NAC', 'schizophrenia', 'glutathione', 'oxidative stress'],
    compounds: ['NAC'],
    pathways: ['Glutamate', 'Antioxidant'],
    readMinutes: 11,
    doi: '10.1016/j.biopsych.2023.712'
  },
  {
    id: '8',
    pmid: '41234567',
    title: 'BPC-157 promotes tendon healing: evidence from animal models and early clinical observations',
    abstract: 'BPC-157, a pentadecapeptide derived from human gastric juice, has demonstrated remarkable tendon healing properties in multiple animal models. This review synthesizes findings from 18 preclinical studies showing accelerated tendon-to-bone healing, reduced inflammation, and promotion of angiogenesis. Early compassionate-use clinical data (n=34) supports translational potential.',
    journal: 'Journal of Orthopaedic Research',
    year: 2024,
    volume: '42',
    issue: '1',
    pages: '45-58',
    authors: ['Chang W.', 'Sikiric P.', 'Seiwerth S.'],
    category: 'Peptides',
    studyType: 'systematic review',
    quality: 3,
    tags: ['BPC-157', 'tendon', 'healing', 'angiogenesis'],
    compounds: ['BPC-157'],
    pathways: ['NO system', 'Growth factors'],
    readMinutes: 13,
    doi: '10.1002/jor.24567'
  },
  {
    id: '9',
    pmid: '42345678',
    title: 'Metformin effects on aging biomarkers: the TAME trial interim analysis',
    abstract: 'The Targeting Aging with Metformin (TAME) trial interim analysis reports on 3000 participants aged 65-79 receiving metformin 1000mg BID vs placebo. At 24 months, metformin showed significant reductions in inflammatory markers (IL-6: -18%, CRP: -22%), improved insulin sensitivity (HOMA-IR: -15%), and trends toward reduced age-related disease composite endpoint (HR 0.82, 95%CI 0.65-1.03).',
    journal: 'The Lancet Healthy Longevity',
    year: 2024,
    volume: '5',
    issue: '3',
    pages: 'e189-e201',
    authors: ['Barzilai N.', 'Kritchevsky S.', 'Kirkland J.'],
    category: 'Longevity',
    studyType: 'clinical trial',
    quality: 5,
    tags: ['metformin', 'aging', 'AMPK', 'inflammation'],
    compounds: ['Metformin'],
    pathways: ['AMPK', 'mTOR', 'Insulin signaling'],
    readMinutes: 16,
    doi: '10.1016/S2666-7568(24)00189'
  },
  {
    id: '10',
    pmid: '43456789',
    title: 'Lion\'s Mane (Hericium erinaceus) and nerve growth factor: a randomized pilot study',
    abstract: 'This randomized, double-blind, placebo-controlled pilot study (n=30) evaluated Lion\'s Mane mushroom extract (1000mg TID) for 16 weeks in adults with mild cognitive impairment. The Lion\'s Mane group showed significant improvement on the cognitive function scale (p<0.05) that decreased upon discontinuation. Serum NGF levels increased by 34% in the treatment group.',
    journal: 'Phytotherapy Research',
    year: 2023,
    volume: '37',
    issue: '5',
    pages: '1798-1806',
    authors: ['Mori K.', 'Inatomi S.', 'Uchiyama K.'],
    category: 'Nootropics',
    studyType: 'RCT',
    quality: 3,
    tags: ['lions mane', 'NGF', 'cognition', 'mushroom'],
    compounds: ['Lion\'s Mane'],
    pathways: ['NGF', 'BDNF'],
    readMinutes: 9,
    doi: '10.1002/ptr.1798'
  }
];

export const compounds: Compound[] = [
  {
    id: '1',
    name: 'Semax',
    synonyms: ['Semax peptide', 'N-Glutamyl-L-prolyl-L-leucyl-L-glycyl-L-prolyl-L-arginyl-L-proline'],
    class: 'Nootropics & Cognition',
    description: 'Heptapeptide nootropic derived from ACTH(4-10). Enhances cognitive function, neuroprotection, and learning through modulation of glutamate and dopamine systems.',
    mechanisms: ['NMDA receptor modulation', 'BDNF upregulation', 'Membrane stabilization', 'Dopamine sensitization'],
    interactions: ['Stacks with racetams', 'Synergistic with choline sources', 'Compatible with cerebrolisin'],
    evidence: 'human'
  },
  {
    id: '2',
    name: '9-Me-BC',
    synonyms: ['9-Methyl-β-carboline', '9-Me-BC HCl'],
    class: 'Nootropics & Cognition',
    description: 'A dopaminergic neurogenesis promoter that stimulates growth of new dopamine neurons. Shows promise for Parkinson disease therapy and cognitive enhancement.',
    mechanisms: ['Dopaminergic neurogenesis', 'Wnt/β-catenin activation', 'TH expression upregulation', 'MAO-B inhibition (weak)'],
    interactions: ['Combine with L-DOPA precursors', 'Avoid with MAOIs', 'Synergistic with BDNF promoters'],
    evidence: 'preclinical'
  },
  {
    id: '3',
    name: 'Creatine',
    synonyms: ['Creatine monohydrate', 'CrH2O', 'N-methyl-N-guanyl-glycine'],
    class: 'Nootropics & Cognition',
    description: 'Endogenous compound that regenerates ATP via phosphocreatine system. Well-established cognitive enhancer particularly under stress conditions (sleep deprivation, hypoxia).',
    mechanisms: ['Phosphocreatine/ATP buffer', 'NMDA receptor modulation', 'Cellular hydration', 'Mitochondrial support'],
    interactions: ['Synergistic with caffeine (timing-dependent)', 'Requires adequate hydration', 'Stacks with glucose for uptake'],
    evidence: 'human'
  },
  {
    id: '4',
    name: 'Rapamycin',
    synonyms: ['Sirolimus', 'Rapamune'],
    class: 'Longevity & Metabolism',
    description: 'mTORC1 inhibitor with robust lifespan extension in animal models. Shows promise for age-related disease prevention through autophagy induction and immune modulation.',
    mechanisms: ['mTORC1 inhibition', 'Autophagy induction', 'Immunosuppression', 'Anti-inflammatory'],
    interactions: ['Avoid with immunosuppressants', 'CYP3A4 substrate', 'Monitor blood lipids'],
    evidence: 'preclinical'
  },
  {
    id: '5',
    name: 'Tianeptine',
    synonyms: ['Coaxil', 'Stablon'],
    class: 'Neurology & Psychiatry',
    description: 'Atypical antidepressant with μ-opioid receptor agonism. Provides rapid antidepressant and anxiolytic effects through unique glutamatergic modulation.',
    mechanisms: ['μ-opioid receptor full agonist', 'Glutamate modulation', 'HPA axis normalization', 'BDNF restoration'],
    interactions: ['Addictive potential at high doses', 'Avoid with other opioids', 'Do not combine with MAOIs'],
    evidence: 'human'
  },
  {
    id: '6',
    name: 'Ashwagandha',
    synonyms: ['Withania somnifera', 'KSM-66', 'Sensoril'],
    class: 'Nootropics & Cognition',
    description: 'Adaptogenic herb that reduces cortisol, improves stress resilience, and supports cognitive function through GABAergic and HPA axis modulation.',
    mechanisms: ['Cortisol reduction', 'GABA-A modulation', 'HPA axis regulation', 'Anti-inflammatory'],
    interactions: ['May enhance thyroid function', 'Stacks with L-theanine', 'Monitor with thyroid medications'],
    evidence: 'human'
  },
  {
    id: '7',
    name: 'NAC',
    synonyms: ['N-acetylcysteine', 'N-acetyl-L-cysteine'],
    class: 'Longevity & Metabolism',
    description: 'Precursor to glutathione, the body\'s master antioxidant. Shows efficacy in OCD, trichotillomania, schizophrenia (negative symptoms), and respiratory conditions.',
    mechanisms: ['Glutathione precursor', 'Glutamate modulation (cystine exchange)', 'Mucolytic', 'Anti-inflammatory'],
    interactions: ['Synergistic with glycine (GlyNAC)', 'Take on empty stomach', 'May reduce nitroglycerin efficacy'],
    evidence: 'human'
  },
  {
    id: '8',
    name: 'BPC-157',
    synonyms: ['Body Protection Compound-157', 'Pentadecapeptide BPC'],
    class: 'Peptides',
    description: 'Gastric pentadecapeptide with remarkable healing properties for tendons, ligaments, GI tract, and nervous system. Promotes angiogenesis and NO system modulation.',
    mechanisms: ['NO system modulation', 'Growth factor upregulation', 'Angiogenesis promotion', 'Anti-inflammatory'],
    interactions: ['Compatible with most compounds', 'Synergistic with TB-500', 'Oral for GI, injectable for musculoskeletal'],
    evidence: 'limited'
  },
  {
    id: '9',
    name: 'Metformin',
    synonyms: ['Glucophage', 'Dimethylbiguanide'],
    class: 'Anti-diabetics',
    description: 'First-line diabetes medication with emerging longevity applications. Activates AMPK, reduces inflammation, and improves metabolic health markers.',
    mechanisms: ['AMPK activation', 'mTOR inhibition (indirect)', 'Insulin sensitization', 'Mitochondrial complex I inhibition'],
    interactions: ['May blunt exercise adaptations', 'Monitor B12 levels', 'Avoid with contrast dye'],
    evidence: 'human'
  },
  {
    id: '10',
    name: 'Lion\'s Mane',
    synonyms: ['Hericium erinaceus', 'Yamabushitake'],
    class: 'Nootropics & Cognition',
    description: 'Medicinal mushroom that stimulates Nerve Growth Factor (NGF) synthesis. Hericenones and erinacines cross the blood-brain barrier to promote neurogenesis.',
    mechanisms: ['NGF stimulation', 'BDNF upregulation', 'Neurogenesis promotion', 'Anti-inflammatory'],
    interactions: ['Stacks with other nootropics', 'Dual extract preferred', 'Compatible with most compounds'],
    evidence: 'limited'
  },
  {
    id: '11',
    name: 'Phenibut',
    synonyms: ['β-phenyl-γ-aminobutyric acid', 'Noofen'],
    class: 'Neurology & Psychiatry',
    description: 'GABA-B agonist and α2δ subunit ligand with anxiolytic and pro-social effects. Significant dependence potential with chronic use.',
    mechanisms: ['GABA-B agonism', 'α2δ calcium channel modulation', 'Dopamine modulation (indirect)'],
    interactions: ['High dependence risk', 'Avoid with alcohol', 'Do not combine with other GABAergics'],
    evidence: 'human'
  },
  {
    id: '12',
    name: 'NSI-189',
    synonyms: ['NSI-189 phosphate'],
    class: 'Nootropics & Cognition',
    description: 'Neurogenic compound that increases hippocampal volume. Developed for MDD treatment through promotion of neurogenesis in the dentate gyrus.',
    mechanisms: ['Hippocampal neurogenesis', 'BDNF upregulation', 'Mitochondrial biogenesis'],
    interactions: ['Limited interaction data', 'May stack with BDNF promoters'],
    evidence: 'limited'
  }
];

export const goals: Goal[] = [
  { id: '1', name: 'Muscle & Strength', color: '#F85149', compounds: ['Creatine', 'Semax'] },
  { id: '2', name: 'Bone & Joints', color: '#D29922', compounds: ['BPC-157'] },
  { id: '3', name: 'Skin/Hair & Pigmentation', color: '#F778BA', compounds: [] },
  { id: '4', name: 'Hormones & Fertility', color: '#A371F7', compounds: ['Ashwagandha'] },
  { id: '5', name: 'GH & IGF-1', color: '#39D2C0', compounds: [] },
  { id: '6', name: 'Metabolism & Fat Loss', color: '#E3B341', compounds: ['Metformin', 'Rapamycin'] },
  { id: '7', name: 'Repair/Blood/Longevity', color: '#3FB950', compounds: ['Rapamycin', 'NAC', 'Metformin', 'BPC-157'] },
  { id: '8', name: 'Brain & Cognition', color: '#58A6FF', compounds: ['Semax', '9-Me-BC', 'Creatine', 'Lion\'s Mane', 'NSI-189', 'Ashwagandha'] },
  { id: '9', name: 'Anti-Inflammation', color: '#D29922', compounds: ['NAC', 'Ashwagandha', 'Metformin'] },
  { id: '10', name: 'Immunity & Infection', color: '#3FB950', compounds: ['NAC'] }
];

export const receptors: Receptor[] = [
  { id: '1', name: 'GABA-A', class: 'GABA', subtype: 'GABA-A', region: 'Cortex, Hippocampus', ligands: [{ compound: 'Ashwagandha', action: 'modulator' }] },
  { id: '2', name: 'GABA-B', class: 'GABA', subtype: 'GABA-B', region: 'Thalamus, Spinal cord', ligands: [{ compound: 'Phenibut', action: 'agonist' }] },
  { id: '3', name: 'NMDA', class: 'GLUTAMATE', subtype: 'NMDA', region: 'Hippocampus, Cortex', ligands: [{ compound: 'Semax', action: 'modulator' }, { compound: 'NAC', action: 'modulator' }] },
  { id: '4', name: 'AMPA', class: 'GLUTAMATE', subtype: 'AMPA', region: 'Cortex, Hippocampus', ligands: [] },
  { id: '5', name: 'D1', class: 'MONOAMINES', subtype: 'D1-like', region: 'Striatum, PFC', ligands: [{ compound: '9-Me-BC', action: 'indirect agonist' }] },
  { id: '6', name: 'D2', class: 'MONOAMINES', subtype: 'D2-like', region: 'Striatum, SN/VTA', ligands: [{ compound: 'Semax', action: 'sensitizer' }] },
  { id: '7', name: '5-HT1A', class: 'MONOAMINES', subtype: '5-HT1A', region: 'Raphe, Hippocampus', ligands: [{ compound: 'Tianeptine', action: 'indirect modulator' }] },
  { id: '8', name: 'μ-Opioid', class: 'OPIOID', subtype: 'MOR', region: 'PAG, Thalamus, Limbic', ligands: [{ compound: 'Tianeptine', action: 'full agonist' }] },
  { id: '9', name: 'CB1', class: 'CANNABINOID', subtype: 'CB1', region: 'Cortex, Basal ganglia', ligands: [] },
  { id: '10', name: 'M1', class: 'ACETYLCHOLINE', subtype: 'Muscarinic', region: 'Hippocampus, Cortex', ligands: [] },
  { id: '11', name: 'TAAR1', class: 'TRACE AMINE', subtype: 'TAAR1', region: 'SN/VTA, DRN', ligands: [] }
];

export const products: Product[] = [
  { id: '1', name: 'NeuroDifference Semax', category: 'Nootropics', variants: [{ name: '30mg × 10 vials', price: 45, stock: 93 }, { name: '30mg × 20 vials', price: 82, stock: 46 }], shipGroups: ['A', 'B', 'C'] },
  { id: '2', name: 'NeuroDifference 9-Me-BC', category: 'Nootropics', variants: [{ name: '1g powder', price: 38, stock: 28 }, { name: '5g powder', price: 155, stock: 12 }], shipGroups: ['A', 'B'] },
  { id: '3', name: 'NeuroDifference Creatine', category: 'Supplements', variants: [{ name: '250g powder', price: 18, stock: 200 }, { name: '500g powder', price: 32, stock: 150 }], shipGroups: ['A', 'B', 'C', 'D', 'E'] },
  { id: '4', name: 'NeuroDifference Rapamycin', category: 'Research', variants: [{ name: '5mg × 10 tabs', price: 65, stock: 34 }, { name: '5mg × 30 tabs', price: 175, stock: 18 }], shipGroups: ['A', 'B'] },
  { id: '5', name: 'NeuroDifference NAC', category: 'Supplements', variants: [{ name: '600mg × 100 caps', price: 14, stock: 300 }, { name: '600mg × 250 caps', price: 29, stock: 180 }], shipGroups: ['A', 'B', 'C', 'D', 'E'] },
  { id: '6', name: 'NeuroDifference BPC-157', category: 'Peptides', variants: [{ name: '5mg vial', price: 42, stock: 56 }, { name: '10mg vial', price: 75, stock: 31 }], shipGroups: ['A', 'B', 'C'] },
  { id: '7', name: 'NeuroDifference Lion\'s Mane', category: 'Supplements', variants: [{ name: '500mg × 60 caps', price: 22, stock: 120 }, { name: '1000mg × 120 caps', price: 38, stock: 85 }], shipGroups: ['A', 'B', 'C', 'D', 'E'] },
  { id: '8', name: 'NeuroDifference NSI-189', category: 'Research', variants: [{ name: '40mg × 30 caps', price: 89, stock: 22 }, { name: '40mg × 60 caps', price: 165, stock: 11 }], shipGroups: ['A', 'B'] },
  { id: '9', name: 'NeuroDifference Tianeptine', category: 'Research', variants: [{ name: '12.5mg × 60 tabs', price: 35, stock: 67 }], shipGroups: ['A', 'B'] },
  { id: '10', name: 'NeuroDifference Metformin', category: 'Research', variants: [{ name: '500mg × 100 tabs', price: 12, stock: 400 }, { name: '1000mg × 100 tabs', price: 16, stock: 250 }], shipGroups: ['A', 'B', 'C', 'D', 'E'] }
];

export const categories = [
  'Anabolic Steroids', 'CASBs', 'NRMAs/NK-1 Antagonists', 'GH & Secretagogues',
  'Peptides', 'GLP-1 & Body', 'SGRMs & Growth Mods', 'Antibiotics & Support',
  'Longevity & Metabolism', 'Nootropics & Cognition', 'Anti-diabetics',
  'Immunology & Biologics', 'Cardiovascular', 'Neurology & Psychiatry',
  'Analgesia & Anesthesia', 'Gastrointestinal & Hepatic', 'Dermatology & Topicals',
  'Oncology & Cytotoxics', 'Adaptogens'
];

export const studyTypes = ['RCT', 'meta-analysis', 'systematic review', 'clinical trial', 'comparative', 'multicenter', 'observational'];

export const shopCategories = [
  { name: 'Nootropics', count: 4 },
  { name: 'Anxiolytics', count: 1 },
  { name: 'Peptides', count: 1 },
  { name: 'Research', count: 2 },
  { name: 'Supplements', count: 3 },
  { name: 'Supplies & Media', count: 0 },
  { name: 'Equipment', count: 0 },
];

export const shipGroups = [
  { id: 'all', name: 'All groups', regions: 'Worldwide' },
  { id: 'A', name: 'Group A: EU', regions: 'European Union' },
  { id: 'B', name: 'Group B: US', regions: 'United States' },
  { id: 'C', name: 'Group C: RU', regions: 'Russia & CIS' },
  { id: 'D', name: 'Group D: CA', regions: 'Canada' },
  { id: 'E', name: 'Group E: AU', regions: 'Australia & NZ' },
];
