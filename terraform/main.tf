resource "github_repository" "nexus" {
  name                   = "nexus"
  description            = "A collection of oft-used packages."
  allow_rebase_merge     = false
  allow_squash_merge     = false
  delete_branch_on_merge = true
  has_downloads          = false
  has_issues             = false
  has_projects           = false
  has_wiki               = false
}
