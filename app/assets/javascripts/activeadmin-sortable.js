(function($) {
  $(document).ready(function() {
    $('.handle').closest('tbody').activeAdminSortable();
  });

  $.fn.activeAdminSortable = function() {
    this.sortable({
      update: function(event, ui) {
        var url = ui.item.find('[data-sort-url]').data('sort-url');
        var token = $('meta[name="csrf-token"]').attr('content');

        $.ajax({
          url: url,
          type: 'post',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', token)
          },
          data: { position: ui.item.index() + 1 },
          success: function() { window.location.reload() }
        });
      }
    });

    this.disableSelection();
  }
})(jQuery);