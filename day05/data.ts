export const exampleData = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

export const data = ``;

type RulesRecord = Record<string, { before: string[]; after: string[] }>;

/**
 * Separate rules and updates, and then process them.
 */
function processData(data: string): {
  rules: RulesRecord;
  updates: string[][];
} {
  const lines = data.split('\n');
  const splittingPoint = lines.indexOf('');

  const rules = lines
    .slice(0, splittingPoint)
    .reduce<RulesRecord>((allRules, ruleStr) => {
      const [printBefore, printAfter] = ruleStr.split('|');

      if (!allRules[printBefore]) {
        allRules[printBefore] = { before: [], after: [printAfter] };
      } else {
        allRules[printBefore] = {
          before: [...allRules[printBefore].before],
          after: [...allRules[printBefore].after, printAfter],
        };
      }

      if (!allRules[printAfter]) {
        allRules[printAfter] = { before: [printBefore], after: [] };
      } else {
        allRules[printAfter] = {
          before: [...allRules[printAfter].before, printBefore],
          after: [...allRules[printAfter].after],
        };
      }

      return allRules;
    }, {});

  const updates = lines
    .slice(splittingPoint + 1)
    .map((update) => update.split(','));

  return { rules, updates };
}

export const processedExampleData = processData(exampleData);
export const processedData = processData(data);
