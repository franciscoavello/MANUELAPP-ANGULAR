module ApplicationHelper
  def set_page_title(title = '')
    default_title = "MANUEL"

    if title.empty?
      default_title
    else
      "#{title} | #{default_title}"
    end
  end
end
