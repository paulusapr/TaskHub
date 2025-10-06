import 'package:flutter/material.dart';
import '../../services/store.dart';
import '../../services/task.dart';

class CreateTaskPage extends StatefulWidget {
  const CreateTaskPage({super.key, required this.title});

  final String title;

  @override
  State<CreateTaskPage> createState() => _CreateTaskPageState();
}

class _CreateTaskPageState extends State<CreateTaskPage> {
  final store = StoreService();

  final _formKey = GlobalKey<FormState>();
  final TextEditingController _titleController = TextEditingController();
  bool _loading = false;

  void _logout() async {
    store.removeToken();
    Navigator.pushReplacementNamed(context, '/login');
  }

  void _handleCreate() async {
    setState(() => _loading = true);

    try {
      final result = await TaskService.createTask(
        _titleController.text,
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
      _titleController.clear();
      Future.delayed(const Duration(seconds: 1), () {
        setState(() => _loading = false);
        Navigator.pushReplacementNamed(context, '/home');
      });
    }
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
      body: Stack(
        children: [
          if (_loading)
            const Center(
              child: CircularProgressIndicator(),
            ),
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 25.0, horizontal: 25.0),
              child: Form(
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
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text('Submit'),
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
                            _handleCreate();
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
