import 'package:flutter/material.dart';
import '../services/store.dart';
import '../services/task.dart';
import '../models/task.dart';
import 'tasks/edit.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final store = StoreService();

  List _data = [];
  bool _loading = true;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    _getTask();
  }

  Future<void> _getTask() async {
    try {
      final result = await TaskService.getAllTasks();

      if (mounted) {
        setState(() {
          _data = (result['data'] as List)
              .map((item) => TaskItem.fromJson(item))
              .toList();
        });
      }
    } on Exception catch (e) {
      if (mounted) {
        setState(() {
          _data = [];
          errorMessage = 'get data error: $e';
        });
      }
    } finally {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    }
  }

  void _handleRemove(int id) async {
    setState(() {
      _loading = true;
    });
    try {
      final result = await TaskService.removeTask(id);
      final successMessage = result['message'];

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(successMessage),
          backgroundColor: Colors.green,
        ),
      );
    } on Exception catch (e) {
      final errorMessage = 'Delete Error: $e';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(errorMessage),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      _getTask();
    }
  }

  void _logout() async {
    store.removeToken();
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: () => _logout(),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
            onRefresh: _getTask,
            child: errorMessage != null ? Text(errorMessage as String)
                : _data.isEmpty ? Text('Task is empty...')
                : ListView.builder(
                    itemCount: _data.length,
                    itemBuilder: (context, index) {
                      final task = _data[index];

                      return Card(
                        elevation: 2,
                        child: Container(
                          decoration: BoxDecoration(
                            border: Border.all(color: Colors.grey.shade300, width: 1.0),
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: ListTile(
                            leading: Icon(
                              task.status == 'To Do' ? Icons.assignment
                                  : task.status == 'In Progress' ? Icons.access_time
                                  : Icons.check_circle_outline,
                              color: task.status == 'Done' ? Colors.green : Colors.blueGrey,
                            ),
                            title: Text(task.title),
                            subtitle: Text('Status: ${task.status}'),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute<void>(
                                  builder: (context) => EditTaskPage(title: 'Edit Task', id: task.id),
                                ),
                              );
                            },
                            trailing: IconButton(
                              icon: const Icon(Icons.delete_outline),
                              color: Colors.red,
                              onPressed: () {
                                _handleRemove(task.id);
                              },
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/tasks/create');
        },
        tooltip: 'Add New Task',
        child: const Icon(Icons.add),
      ),
    );
  }
}
