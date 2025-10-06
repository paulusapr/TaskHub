import 'package:flutter/material.dart';
import '../../services/store.dart';
import '../../services/task.dart';

class EditTaskPage extends StatefulWidget {
  const EditTaskPage({super.key, required this.title, this.id});

  final String title;
  final int? id;

  @override
  State<EditTaskPage> createState() => _EditTaskPageState();
}

class _EditTaskPageState extends State<EditTaskPage> {
  final store = StoreService();

  final _formKey = GlobalKey<FormState>();
  final TextEditingController _titleController = TextEditingController();
  String _selectedStatus = 'To Do';

  bool _loading = true;
  String? errorMessage;
  int? taskId;

  @override
  void initState() {
    super.initState();
    taskId = widget.id;
    _getTaskById();
  }

  Future<void> _getTaskById() async {
    try {
      final result = await TaskService.getTask(taskId as int);

      if (mounted) {
        _titleController.text = result['data']['title'];
        setState(() {
          _selectedStatus = result['data']['status'];
        });
      }
    } on Exception catch (e) {
      if (mounted) {
        setState(() {
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

  void _logout() async {
    store.removeToken();
    Navigator.pushReplacementNamed(context, '/login');
  }

  void _handleUpdate() async {
    setState(() => _loading = true);

    try {
      final result = await TaskService.updateTask(
        taskId as int,
        _titleController.text,
        _selectedStatus,
      );
      final successMessage = result['message'];

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(successMessage),
          backgroundColor: Colors.green,
        ),
      );
    } on Exception catch (e) {
      final errorMessage = 'Something went wrong';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(errorMessage),
          backgroundColor: Colors.red,
        ),
      );
      setState(() => _loading = false);
    } finally {
      _formKey.currentState?.reset();
      Future.delayed(const Duration(seconds: 1), () {
        setState(() => _loading = false);
        Navigator.pushReplacementNamed(context, '/home');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<String> _options = ['To Do', 'In Progress', 'Done'];
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
      body: Stack(
        children: [
          if (_loading)
            const Center(
              child: CircularProgressIndicator(),
            ),
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 25.0, horizontal: 25.0),
              child: errorMessage != null ? Text(errorMessage as String) : Form(
                key: _formKey,
                child: Column(
                  spacing: 16,
                  children: [
                    TextFormField(
                      controller: _titleController,
                      decoration: InputDecoration(
                          labelText: 'Title',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(4.0),
                          )
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) return 'Enter Title';
                        return null;
                      },
                    ),
                    DropdownButtonFormField<String>(
                      initialValue: _selectedStatus,
                      decoration: const InputDecoration(
                        labelText: 'Select Status',
                        border: OutlineInputBorder(),
                        hintText: 'Tap to select',
                      ),
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedStatus = newValue ?? 'To Do';
                        });
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please select an option.';
                        }
                        return null;
                      },
                      items: _options.map((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(option),
                        );
                      }).toList(),
                    ),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text('Update'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(6),
                          ),
                          padding: const EdgeInsets.symmetric(vertical: 14),
                        ),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            _handleUpdate();
                          }
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
