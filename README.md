## 1. Git Configuration & Local Repository Setup

### Theory
- **What is Git?**  
  Git is a distributed version control system that records changes to your files over time. It allows multiple developers to collaborate and keeps a complete history of changes.

- **Why Configure Git?**  
  Configuring Git with your name and email ties every commit to you, which is essential for tracking contributions and collaboration.

### Example: Configuring Git and Creating Your First Repository

**Step 1: Install and Configure Git**

1. **Install Git (if not already installed):**  
   - Download from [git-scm.com](https://git-scm.com) and follow the installation instructions.

2. **Configure Your Git Identity:**  
   Open your terminal (or Git Bash) and run:
   ```bash
   git config --global user.name "Alice Developer"
   git config --global user.email "alice@example.com"
   ```
   **Expected Outcome:**  
   Your global Git configuration is set. Verify by running:
   ```bash
   git config --list
   ```
   You should see your username and email among other settings.

---

## 2. Creating Your First Local Repository and Pushing to GitHub

### Theory
- **What is a Repository?**  
  A Git repository is a directory that stores your project files and the entire history of changes.

- **Why Manage Repositories?**  
  A repository lets you track changes, experiment with new features, and revert to previous versions if needed.

### Example: Initialize Repository, Create README, Commit, and Push

1. **Create a New Project Directory:**
   ```bash
   mkdir advanced-git-workflows
   cd advanced-git-workflows
   ```
   **Explanation:**  
   This creates and navigates into a new folder named `advanced-git-workflows`.

2. **Initialize a Git Repository:**
   ```bash
   git init
   ```
   **Expected Outcome:**  
   Terminal displays:
   ```
   Initialized empty Git repository in /path/to/advanced-git-workflows/.git
   ```

3. **Create a README File:**
   ```bash
   echo "# Advanced Git Workflows" > README.md
   ```
   **Explanation:**  
   This command creates a README.md file with a title.

4. **Stage and Commit the README:**
   ```bash
   git add README.md
   git commit -m "Initial commit: Add README"
   ```
   **Expected Outcome:**  
   Git outputs a commit summary showing that README.md was added.

5. **Link to a Remote Repository (GitHub):**  
   - Create a new repository on GitHub named `advanced-git-workflows` (do not initialize it with a README).
   - Then add the remote:
     ```bash
     git remote add origin https://github.com/yourusername/advanced-git-workflows.git
     ```
   **Explanation:**  
   Replace `yourusername` with your GitHub username.

6. **Push the Commit to GitHub:**
   ```bash
   git push -u origin main
   ```
   **Expected Outcome:**  
   Your commit is pushed and the GitHub repo shows the README file.

---

## 3. Feature Branching Workflow

### Theory
- **What is Branching?**  
  Branching creates an isolated development environment. It allows you to work on features or bug fixes without affecting the main codebase.

- **Benefits of Feature Branches:**  
  They enable parallel development, reduce risks of conflict, and ease the integration of changes when merged.

### Example: Create a Feature Branch, Add a File, and Open a Pull Request

1. **Create and Switch to a Feature Branch:**
   ```bash
   git checkout -b feature/add-login-page
   ```
   **Expected Outcome:**  
   Terminal confirms you are now on `feature/add-login-page`.

2. **Create a New File (login.html):**
   ```bash
   echo "<html><body><h1>Login Page</body></html>" > login.html
   ```
   **Explanation:**  
   This command creates a simple HTML file.

3. **Stage and Commit the New File:**
   ```bash
   git add login.html
   git commit -m "Add basic login page"
   ```
   **Expected Outcome:**  
   A commit is made including `login.html`.

4. **Push the Feature Branch to GitHub:**
   ```bash
   git push -u origin feature/add-login-page
   ```

5. **Create a Pull Request on GitHub:**  
   - Navigate to your repository on GitHub.
   - Use the prompt to create a pull request for `feature/add-login-page`.
   - Provide a title (e.g., “Add login page feature”) and a description, then click **Create Pull Request**.

6. **Merge the Pull Request:**
   - On GitHub, review and click **Merge Pull Request**.
   - Back in your terminal, switch to `main` and pull the changes:
     ```bash
     git checkout main
     git pull origin main
     ```
   **Expected Outcome:**  
   The `login.html` file is now part of the `main` branch.

### Example: Creating a New Branch and Making Changes

1. **Create a Branch for a Contact Page:**
   ```bash
   git checkout -b feature/add-contact-page
   ```
2. **Add a New File (contact.html):**
   ```bash
   echo "<html><body><h1>Contact Us</h1></body></html>" > contact.html
   ```
3. **Stage and Commit the File:**
   ```bash
   git add contact.html
   git commit -m "Add contact page"
   ```
4. **Push the Branch and Open a PR:**
   ```bash
   git push -u origin feature/add-contact-page
   ```
   **On GitHub:** Create a pull request for this branch and merge it into `main`.

---

## 4. Merging Techniques in Git

### Theory
- **What is Merging?**  
  Merging integrates changes from one branch into another. It is essential for combining work from multiple contributors.

- **Types of Merges:**
  - **Fast-Forward Merge:** Moves the branch pointer forward when there’s no divergence.
  - **Three-Way Merge:** Creates a new merge commit when branches have diverged.
  - **Conflict Resolution:** Manually resolving overlapping changes in the same file.

### Example A: Fast-Forward Merge

1. **Create a Feature Branch for Fast-Forward:**
   ```bash
   git checkout -b feature/fast-forward
   echo "Fast-forward merge example" > ff.txt
   git add ff.txt
   git commit -m "Add ff.txt for fast-forward demo"
   ```
2. **Merge into Main:**
   ```bash
   git checkout main
   git merge feature/fast-forward
   git push origin main
   ```
   **Expected Outcome:**  
   Since `main` hasn’t diverged, Git performs a fast-forward merge. The file `ff.txt` appears in `main`.

### Example B: Simulating and Resolving a Merge Conflict

1. **Simulate a Conflict on the Same File:**

   *On `main`:*
   ```bash
   echo "Main branch update" >> login.html
   git commit -am "Update login.html on main"
   ```
   *On a new branch:*
   ```bash
   git checkout -b feature/conflict
   echo "Feature branch update" >> login.html
   git commit -am "Update login.html on feature branch"
   ```
2. **Attempt to Merge the Conflicting Branch:**
   ```bash
   git checkout main
   git merge feature/conflict
   ```
   **Expected Outcome:**  
   Git reports a merge conflict in `login.html` with conflict markers (e.g., `<<<<<<< HEAD`).

3. **Resolve the Conflict:**
   - Open `login.html` in your text editor. You might see:
     ```html
     <html>
     <body>
       <h1>Login Page</h1>
     <<<<<<< HEAD
       Main branch update
     =======
       Feature branch update
     >>>>>>> feature/conflict
     </body>
     </html>
     ```
   - Edit the file to remove conflict markers and choose the desired content.
   - Save the file.

4. **Stage and Complete the Merge:**
   ```bash
   git add login.html
   git commit -m "Resolve merge conflict in login.html"
   ```
   **Expected Outcome:**  
   The conflict is resolved, and the final content of `login.html` reflects your choices.

### Example C: Three-Way Merge

#### Theory  
A three-way merge is used when the main branch and the feature branch have diverged. Git uses the common ancestor of the two branches along with the tips of both branches to automatically create a merge commit.

#### Detailed Example

1. **Create a Common Base Commit:**
   - On the `main` branch, create a file with base content:
     ```bash
     git checkout main
     echo "Base content" > data.txt
     git add data.txt
     git commit -m "Add data.txt with base content"
     ```
   **Explanation:**  
   This commit establishes the common ancestor for both branches.

2. **Create a Feature Branch and Modify the File:**
   ```bash
   git checkout -b feature/three-way
   echo "Feature branch update" >> data.txt
   git commit -am "Update data.txt in feature branch"
   ```
   **Explanation:**  
   The feature branch modifies `data.txt` in a different way.

3. **Switch Back to Main and Modify the File Differently:**
   ```bash
   git checkout main
   echo "Main branch update" >> data.txt
   git commit -am "Update data.txt in main branch"
   ```
   **Explanation:**  
   The main branch also modifies `data.txt`, creating divergence.

4. **Merge the Feature Branch into Main (Three-Way Merge):**
   ```bash
   git merge feature/three-way
   ```
   **Expected Outcome:**  
   Git creates a new merge commit that integrates changes from both branches using the common ancestor. If the changes are in different parts of the file, Git will merge automatically without conflicts.

### Example: Resolving a Merge Conflict in contact.html

1. **Simulate a Conflict:**

   *On `main`:*
   ```bash
   echo "Main branch update" >> contact.html
   git commit -am "Update contact.html on main"
   ```
   *On a new branch:*
   ```bash
   git checkout -b feature/conflict-contact
   echo "Feature branch update" >> contact.html
   git commit -am "Update contact.html on feature branch"
   ```
2. **Merge and Resolve the Conflict:**
   ```bash
   git checkout main
   git merge feature/conflict-contact
   ```
   **Resolve the conflict:**  
   - Open `contact.html` in your editor.
   - Remove conflict markers and choose which lines to keep.
   - Save the file.
   ```bash
   git add contact.html
   git commit -m "Resolve merge conflict in contact.html"
   ```

---

## 5. Rebasing in Git

### Theory
- **What is Rebasing?**  
  Rebasing re-applies commits from one branch onto another base branch, creating a linear history. This is especially useful for cleaning up commit history before merging.

- **When to Use Rebasing:**  
  It is ideal for local, private branches. Avoid rebasing branches that are shared with others to prevent history conflicts.

### Example: Rebase a Feature Branch onto Main

1. **Create a Feature Branch for Rebase:**
   ```bash
   git checkout -b feature/rebase-demo
   echo "Some new feature code" > feature.txt
   git add feature.txt
   git commit -m "Add feature.txt for rebase demo"
   ```
2. **Simulate New Changes on Main:**
   ```bash
   git checkout main
   echo "Update in main branch" >> README.md
   git commit -am "Update README on main"
   ```
3. **Rebase the Feature Branch onto Main:**
   ```bash
   git checkout feature/rebase-demo
   git rebase main
   ```
   **Expected Outcome:**  
   The commit from `feature/rebase-demo` is replayed on top of `main`. If conflicts occur, Git will pause and prompt for resolution.

4. **Resolve Rebase Conflicts (if any):**
   - Edit the conflicted file(s), then:
     ```bash
     git add <file>
     git rebase --continue
     ```
   - If necessary, abort with:
     ```bash
     git rebase --abort
     ```

5. **Force Push the Rebased Branch:**
   ```bash
   git push -f origin feature/rebase-demo
   ```
   **Expected Outcome:**  
   The branch is updated on GitHub with a linear commit history.

### Example: Interactive Rebase to Clean Up Commit History

1. **Create Multiple Commits:**
   ```bash
   git checkout -b feature/multi-commit
   echo "Line 1" > file.txt
   git add file.txt && git commit -m "First commit"
   echo "Line 2" >> file.txt
   git add file.txt && git commit -m "Second commit"
   echo "Line 3" >> file.txt
   git add file.txt && git commit -m "Third commit"
   ```
2. **Start an Interactive Rebase:**
   ```bash
   git rebase -i HEAD~3
   ```
   **In the editor:**  
   You might see:
   ```
   pick abc123 First commit
   pick def456 Second commit
   pick ghi789 Third commit
   ```
   Change `pick` to `squash` (or `s`) for the commits you want to combine, then save and exit.

3. **Force Push the Updated Branch:**
   ```bash
   git push -f origin feature/multi-commit
   ```
   **Expected Outcome:**  
   The commit history for `feature/multi-commit` is now cleaner and more linear.

### Example: Interactive Rebase with Pick, Squash, and Edit

1. **Create Multiple Commits:**
   ```bash
   git checkout -b feature/interactive-rebase
   echo "Line 1" > file.txt
   git add file.txt && git commit -m "First commit"
   echo "Line 2" >> file.txt
   git add file.txt && git commit -m "Second commit"
   echo "Line 3" >> file.txt
   git add file.txt && git commit -m "Third commit"
   ```

2. **Start an Interactive Rebase:**
   ```bash
   git rebase -i HEAD~3
   ```

3. **In the editor, you might see:**
   ```
   pick abc123 First commit
   pick def456 Second commit
   pick ghi789 Third commit
   ```

4. **Change `pick` to `squash` (or `s`) for the commits you want to combine, then save and exit:**
   ```
   pick abc123 First commit
   squash def456 Second commit
   squash ghi789 Third commit
   ```

5. **Edit the commit message if necessary, then save and exit.**

6. **Force Push the Updated Branch:**
   ```bash
   git push -f origin feature/interactive-rebase
   ```

---

## 6. Cherry-Picking Commits

### Theory
- **What is Cherry-Picking?**  
  Cherry-picking lets you apply a specific commit from one branch onto another without merging the entire branch. It is useful for hotfixes or selective change transfers.

### Example: Cherry-Pick a Specific Commit from Another Branch

1. **Identify a Commit to Cherry-Pick:**
   ```bash
   git checkout feature/add-login-page
   git log --oneline
   ```
   **Explanation:**  
   Review the commit log and choose a commit hash (e.g., `a1b2c3d`) to apply to `main`.

2. **Switch to the Target Branch:**
   ```bash
   git checkout main
   ```

3. **Cherry-Pick the Commit:**
   ```bash
   git cherry-pick a1b2c3d
   ```
   **Expected Outcome:**  
   The changes from commit `a1b2c3d` are applied to `main`. If conflicts occur, Git will pause the process.

4. **Resolve Conflicts (if any):**
   - Manually resolve issues in conflicted files.
   - Stage the changes:
     ```bash
     git add <file>
     ```
   - Continue the cherry-pick:
     ```bash
     git cherry-pick --continue
     ```
   - To abort:
     ```bash
     git cherry-pick --abort
     ```

### Example: Cherry-Picking a Commit for a Hotfix

1. **Identify the Commit to Cherry-Pick:**
   ```bash
   git log --oneline
   ```
   **Explanation:**  
   Choose a commit hash (e.g., `b4c5d6e`) that contains the hotfix.

2. **Switch to the Target Branch:**
   ```bash
   git checkout main
   ```

3. **Cherry-Pick the Hotfix Commit:**
   ```bash
   git cherry-pick b4c5d6e
   ```
   **Expected Outcome:**  
   The hotfix changes from commit `b4c5d6e` are applied to `main`. If conflicts occur, Git will pause the process.

4. **Resolve Conflicts (if any):**
   - Manually resolve issues in conflicted files.
   - Stage the changes:
     ```bash
     git add <file>
     ```
   - Continue the cherry-pick:
     ```bash
     git cherry-pick --continue
     ```
   - To abort:
     ```bash
     git cherry-pick --abort
     ```

---

## 7. Setting Up a Sample Public Repository for Practice

### Theory
- **Why Create a Public Repository?**  
  A public repository on GitHub simulates real-world collaboration. It provides an environment for practicing advanced workflows like merging, rebasing, and cherry-picking.

### Example: Creating and Cloning a Public Repository with Multiple Branches

1. **Create a Public Repository on GitHub:**  
   - Log in to GitHub and create a repository named `advanced-git-workflows-practice` with an initial README.

2. **Clone the Repository Locally:**
   ```bash
   git clone https://github.com/yourusername/advanced-git-workflows-practice.git
   cd advanced-git-workflows-practice
   ```

3. **Set Up Initial Branches and Files:**

   **Main Branch:**  
   - Contains the initial README.

   **Feature Branch – Login Page:**
   ```bash
   git checkout -b feature/add-login-page
   echo "<html><body>Login Page</body></html>" > login.html
   git add login.html
   git commit -m "Add login page"
   git push -u origin feature/add-login-page
   ```

   **Feature Branch – Footer:**
   ```bash
   git checkout main
   git checkout -b feature/add-footer
   echo "<footer>Footer content</footer>" > footer.html
   git add footer.html
   git commit -m "Add footer"
   git push -u origin feature/add-footer
   ```

   **Branch with Deliberate Conflict:**
   ```bash
   git checkout main
   git checkout -b feature/conflict-readme
   echo "Conflict update in README" >> README.md
   git commit -am "Add conflicting change to README"
   git push -u origin feature/conflict-readme
   ```

4. **Practice Advanced Workflows:**
   - **Merge via Pull Requests:** Open pull requests on GitHub for `feature/add-login-page` and `feature/add-footer` to merge them into `main`.
   - **Conflict Resolution:** Attempt to merge `feature/conflict-readme` into `main` and resolve the conflict.
   - **Rebase Exercise:** Rebase a feature branch (e.g., `feature/add-footer`) onto the updated `main`.
