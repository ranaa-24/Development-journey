# Git and GitHub Detailed Notes

## Visit here for more details:

[Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials/what-is-version-control)

## 1. Introduction to Git

- Git is a distributed version control system used to track changes in source code during software development. It allows multiple developers to collaborate on a project and keeps track of the history of changes.
- **Version Control System (VCS):** Keeps track of every modification to a file, allowing you to revert to any previous version.
- **Distributed System:** Every user has a complete copy of the repository, including its history.

## 2. Basic Git Terminology

- **Repository (Repo):** A directory where Git stores all files, along with a hidden `.git` directory that contains metadata and the project’s history.
- **Commit:** A snapshot of your project’s files at a specific time. Every commit has a unique ID (SHA-1 hash).
- **Branch:** A parallel version of your project. Allows independent work on different features or bug fixes without affecting the main project.
- **Checkout:** Switching between different branches or commits.
- **Merge:** Combining changes from different branches.
- **Remote:** A version of your project hosted on the internet or network (e.g., GitHub, GitLab).
- **Pull Request (PR):** A GitHub feature that allows you to request a code review and merge changes from one branch to another.

## 3. Git Workflow

### Create or Clone a Repository

- `git init` - Initializes a new Git repository.
- `git clone <repo_url>` - Creates a local copy of a remote repository.

### Make Changes

- **Stage Changes:** `git add <filename>` stages modified files for the next commit.
- **Commit Changes:** `git commit -m "commit message"` saves the staged changes to the repository.

### Sync with Remote

- **Push Changes:** `git push` sends local changes to the remote repository.
- **Pull Changes:** `git pull` fetches and integrates changes from the remote repository to the local repository.

### Branching

- **Create Branch:** `git branch <branch_name>` creates a new branch.
- **Switch Branch:** `git checkout <branch_name>` switches to a specific branch.
- **Merge Branch:** `git merge <branch_name>` merges another branch into your current branch.

## 4. Git Commands

### Repository Setup

- `git init` - Initialize a new Git repository.
- `git clone <repo_url>` - Clone an existing remote repository.

### Checking Status and History

- `git status` - Shows the current state of the working directory and staged changes.
- `git log` - Shows the commit history.
- `git diff` - Shows differences between files or commits.

### Working with Files

- `git add <filename>` - Stage a file for commit.
- `git commit -m "message"` - Commit staged changes with a message.
- `git rm <filename>` - Remove a file from the working directory and stage the removal for commit.

### Branches

- `git branch <branch_name>` - Create a new branch.
- `git checkout <branch_name>` - Switch to an existing branch.
- `git merge <branch_name>` - Merge a branch into the current branch.
- `git branch -d <branch_name>` - Delete a branch.

### Synchronizing with Remote

- `git remote add origin <url>` - Add a remote repository.
- `git push` - Push commits to a remote repository.
- `git pull` - Fetch and merge changes from the remote repository.

## 5. Git Branching and Merging

### Creating a Branch

```sh
git branch feature-branch
```

### Switching to a Branch

```sh
git checkout feature-branch
```

### Merging Branches

```sh
git merge feature-branch
```

### Deleting a Branch

```sh
git branch -d feature-branch
```

## 6. Remote Repositories (GitHub)

### Pushing to GitHub

```sh
git remote add origin <repository_url>
git push origin main
```

### Pulling from GitHub

```sh
git pull origin main
```

### Forking Repositories

On GitHub, you can fork a repository to create a personal copy for modification.

### Creating a Pull Request

After pushing your changes, you can open a pull request to propose merging them into the main project.

## 7. Git Workflow on GitHub

### Forking a Repository

Go to the repository on GitHub and click **Fork** to create your own copy.

### Cloning a Repository

```sh
git clone <repo_url>
```

### Create a New Branch for Changes

```sh
git checkout -b feature-branch
```

### Add and Commit Changes

```sh
git add .
git commit -m "Your commit message"
```

### Push Changes to Your Forked Repository

```sh
git push origin feature-branch
```

### Create a Pull Request

Go to your forked repository on GitHub, click on **New Pull Request**, and submit your changes for review.

## 8. Git Rebase vs Merge

### Merge

Combines the work from two branches by creating a merge commit. Both branches retain their individual commit histories.

```sh
git merge feature-branch
```

### Rebase

Moves or reapplies commits from one branch to another. It rewrites the commit history to create a linear history.

```sh
git rebase main
```

## 9. Handling Conflicts

### Steps to Resolve Conflicts

1. Open the conflicting file.
2. Manually choose which code to keep.
3. Stage the resolved file: `git add <filename>`.
4. Complete the merge or rebase: `git commit` or `git rebase --continue`.

## 10. Git Stash

### Save Work to Stash

```sh
git stash
```

### Apply Stash

```sh
git stash apply
```

### View Stash List

```sh
git stash list
```

## 11. Git Tags

### Create a Tag

```sh
git tag -a v1.0 -m "Version 1.0"
```

### Push Tags to Remote

```sh
git push origin --tags
```

## 12. Git Ignore (.gitignore)

The `.gitignore` file specifies which files or directories to ignore in a Git repository.

### Example .gitignore file:

```sh
# Ignore all .log files
*.log

# Ignore node_modules folder
node_modules/
```

## 13. Best Practices with Git

- **Commit Early and Often:** Small commits help keep track of changes and make it easier to debug issues.
- **Use Descriptive Commit Messages:** Each commit message should be clear and describe what changes were made.
- **Keep Branches Short-Lived:** Frequently merge changes to avoid large conflicts.
- **Work on Feature Branches:** Always work on a separate branch when adding new features or fixing bugs.
- **Review Code Thoroughly:** Use pull requests to review code and ensure the quality of changes before merging them.
