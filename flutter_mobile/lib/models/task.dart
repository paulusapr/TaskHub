class TaskItem {
  final int id;
  final String title;
  final String status;
  final int user_id;

  TaskItem({
    required this.id,
    required this.title,
    required this.status,
    required this.user_id,
  });

  factory TaskItem.fromJson(Map<String, dynamic> json) {
    return TaskItem(
      id: json['id'] as int,
      user_id: json['user_id'] as int,
      title: json['title'] as String,
      status: json['status'] as String,
    );
  }
}
