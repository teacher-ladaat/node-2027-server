# Git

## tags

```bash
git tag # רשימת כל התגיות
git tag <tag_name> # <tag_name> הגדיר תגית בשם זה על הקומיט הנוכחי
git tag <tag_name> *commit_id* # <tag_name> הגדיר תגית בשם זה על הקומיט הספציפי
git push --tags # דחיפה של כל התגיות לגיטהאב
```

## branches

```bash
git branch # כל הענפים
git branch <branch_name> # <branch_name> ענף חדש בשם
git checkout <branch_name> # <branch_name> מעבר לענף קיים בשם
git switch -c <branch_name> # ענף חדש ומעבר אליו
git checkout -b <branch_name> # ענף חדש ומעבר אליו
git checkout -d <branch_name> # מחיקת ענף שכבר מוזג
git checkout -D <branch_name> # מחיקת ענף שלא מוזג
git push -u origin <branch_name> # דחיפה של ענף מסוים לגיטהאב
```