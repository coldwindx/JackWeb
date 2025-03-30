import matplotlib.pyplot as plt
import networkx as nx

# Define the nodes and edges
nodes = ['wannacry.exe', 'cmd.exe', '!wannadecryptor.exe', 'cscript.exe', 'taskkill.exe']
edges = [
    ('wannacry.exe', 'cmd.exe'),
    ('wannacry.exe', '!wannadecryptor.exe'),
    ('wannacry.exe', 'cscript.exe'),
    ('wannacry.exe', 'taskkill.exe'),
    ('wannacry.exe', 'taskkill.exe'),
    ('wannacry.exe', 'taskkill.exe'),
    ('wannacry.exe', 'taskkill.exe'),
    ('wannacry.exe', '!wannadecryptor.exe'),
    ('wannacry.exe', 'cmd.exe'),
    ('wannacry.exe', '!wannadecryptor.exe')
]

# Create a directed graph
G = nx.DiGraph()
G.add_nodes_from(nodes)
G.add_edges_from(edges)

# Position nodes using spring layout
pos = nx.spring_layout(G)

# Draw nodes
nx.draw_networkx_nodes(G, pos, node_color='lightblue', node_size=3000)

# Draw edges
nx.draw_networkx_edges(G, pos, edge_color='gray')

# Draw labels
labels = {node: node for node in nodes}
nx.draw_networkx_labels(G, pos, labels, font_size=12, font_weight='bold')

# Highlight specific nodes
highlighted_nodes = ['wannacry.exe', 'cmd.exe', '!wannadecryptor.exe', 'cscript.exe']
nx.draw_networkx_nodes(G, pos, nodelist=highlighted_nodes, node_color='red', node_size=3000)

# Highlight specific edges
highlighted_edges = [('wannacry.exe', 'cmd.exe'), ('wannacry.exe', '!wannadecryptor.exe'), ('wannacry.exe', 'cscript.exe')]
nx.draw_networkx_edges(G, pos, edgelist=highlighted_edges, edge_color='red', width=2)

# Set margins
plt.margins(0.1, 0.1)

# Show the plot
plt.show()